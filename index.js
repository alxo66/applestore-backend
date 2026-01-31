const express = require("express");
const cors = require("cors");
const QRCode = require("qrcode");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* ================== ДАННЫЕ (ПОКА ЗАГЛУШКИ) ================== */

let balance = 12500;

let deposits = [
  {
    date: Date.now() - 86400000,
    currency: "BTC",
    amount: 0.002,
    status: "done"
  },
  {
    date: Date.now() - 3600000,
    currency: "USDT",
    amount: 100,
    status: "pending"
  }
];

let orders = [
  {
    date: Date.now() - 7200000,
    product: "Apple Gift Card 500₽",
    price: 500,
    status: "done"
  }
];

/* ================== КОШЕЛЬКИ ================== */

const wallets = {
  BTC: "bc1qlgf034j5nhqh0ltsqnhrepchlxwlykrtujvupq",
  ETH: "0x5Fc25f19E18Dfc7d19595cB7d1eB0D0605b9A3FA",
  USDT: "TMM1xGXxAY9R66hGPxKNfxo81KrmdyrszE",
  TON: "UQD-XSYf6P-NyjbSJYDHsgHnk0e5CiJQ2-NCZddro_5-c8B4"
};

const ratesRub = {
  BTC: 5800000,
  ETH: 300000,
  USDT: 95,
  TON: 230
};

/* ================== API ================== */

app.get("/", (req, res) => {
  res.send("AppleStore backend is running 🚀");
});

app.get("/api/balance", (req, res) => {
  res.json({ balance });
});

app.get("/api/deposits", (req, res) => {
  res.json(deposits);
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.get("/api/deposit", async (req, res) => {
  try {
    const result = {};

    for (const coin of Object.keys(wallets)) {
      const qr = await QRCode.toDataURL(wallets[coin]);
      result[coin] = {
        address: wallets[coin],
        qr,
        rateRub: ratesRub[coin]
      };
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Deposit error" });
  }
});

/* ================== START ================== */

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
