const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* =======================
   CONFIG
======================= */

const CRYPTOBOT_TOKEN = process.env.CRYPTOBOT_TOKEN;
const TELEGRAM_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TELEGRAM_ADMIN_CHAT = process.env.TG_ADMIN_CHAT;

/* =======================
   IN-MEMORY DB (MVP)
======================= */

const users = {
  demo: {
    balance: 0,
    reserved: 0,
    deposits: [],
    orders: []
  }
};

/* =======================
   HELPERS
======================= */

async function tgNotify(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ADMIN_CHAT) return;
  await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_ADMIN_CHAT,
        text
      })
    }
  );
}

/* =======================
   HEALTH
======================= */

app.get("/", (_, res) => {
  res.send("AppleStore backend is running 🚀");
});

/* =======================
   CREATE CRYPTO INVOICE
======================= */

app.post("/api/crypto/invoice", async (req, res) => {
  const { userId = "demo", amount, asset } = req.body;

  if (!users[userId]) return res.status(404).json({ error: "User not found" });

  try {
    const response = await fetch("https://pay.crypt.bot/api/createInvoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Crypto-Pay-API-Token": CRYPTOBOT_TOKEN
      },
      body: JSON.stringify({
        asset,
        amount,
        description: "Apple Store balance top-up",
        payload: userId
      })
    });

    const data = await response.json();
    if (!data.ok) return res.status(400).json(data);

    users[userId].deposits.push({
      invoice_id: data.result.invoice_id,
      amount,
      asset,
      status: "pending",
      date: Date.now()
    });

    res.json({ pay_url: data.result.pay_url });
  } catch (e) {
    res.status(500).json({ error: "Invoice error" });
  }
});

/* =======================
   CRYPTOBOT WEBHOOK
======================= */

app.post("/api/crypto/webhook", (req, res) => {
  const update = req.body;

  if (update.update_type === "invoice_paid") {
    const inv = update.payload;
    const userId = inv.payload;

    const user = users[userId];
    if (!user) return res.sendStatus(200);

    const dep = user.deposits.find(
      d => d.invoice_id === inv.invoice_id
    );

    if (dep && dep.status !== "done") {
      dep.status = "done";
      user.balance += Number(dep.amount);

      tgNotify(
        `💰 Пополнение\nПользователь: ${userId}\n${dep.amount} ${dep.asset}`
      );
    }
  }

  res.sendStatus(200);
});

/* =======================
   USER BALANCE
======================= */

app.get("/api/cabinet", (req, res) => {
  const userId = "demo";
  const u = users[userId];

  res.json({
    balance: u.balance,
    reserved: u.reserved,
    deposits: u.deposits,
    orders: u.orders
  });
});

/* =======================
   CREATE ORDER
======================= */

app.post("/api/order", (req, res) => {
  const userId = "demo";
  const { product, price } = req.body;

  const u = users[userId];
  if (u.balance - u.reserved < price) {
    return res.status(400).json({ error: "Not enough balance" });
  }

  u.reserved += price;

  const order = {
    id: Date.now(),
    product,
    price,
    status: "reserved"
  };

  u.orders.push(order);

  tgNotify(`📦 Новый заказ\n${product}\n$${price}`);

  res.json({ success: true, order });
});

/* =======================
   CONFIRM DELIVERY
======================= */

app.post("/api/order/confirm", (req, res) => {
  const userId = "demo";
  const { orderId } = req.body;

  const u = users[userId];
  const order = u.orders.find(o => o.id === orderId);

  if (!order) return res.status(404).json({ error: "Order not found" });

  if (order.status !== "reserved")
    return res.status(400).json({ error: "Wrong status" });

  order.status = "completed";
  u.reserved -= order.price;
  u.balance -= order.price;

  tgNotify(`✅ Заказ завершён\n${order.product}`);

  res.json({ success: true });
});

/* =======================
   START
======================= */

app.listen(PORT, () =>
  console.log("Server running on port", PORT)
);
/* =======================
   CANCEL ORDER
======================= */

app.post("/api/order/cancel", (req, res) => {
  const userId = "demo";
  const { orderId } = req.body;

  const u = users[userId];
  const order = u.orders.find(o => o.id === orderId);

  if (!order) return res.status(404).json({ error: "Order not found" });
  if (order.status !== "reserved")
    return res.status(400).json({ error: "Wrong status" });

  order.status = "cancelled";
  u.reserved -= order.price;

  tgNotify(`❌ Заказ отменён\n${order.product}`);

  res.json({ success: true });
});
