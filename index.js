const express = require("express");
const cors = require("cors");
const QRCode = require("qrcode");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* КОШЕЛЬКИ */
const wallets = {
  BTC: "bc1qlgf034j5nhqh0ltsqnhrepchlxwlykrtujvupq",
  ETH: "0x5Fc25f19E18Dfc7d19595cB7d1eB0D0605b9A3FA",
  USDT: "TMM1xGXxAY9R66hGPxKNfxo81KrmdyrszE",
  TON: "UQD-XSYf6P-NyjbSJYDHsgHnk0e5CiJQ2-NCZddro_5-c8B4"
};

/* ЗАГЛУШКА КУРСОВ (ПОКА) */
const ratesRub = {
  BTC: 5800000,
  ETH: 300000,
  USDT: 95,
  TON: 230
};

/* API */
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
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Deposit error" });
  }
});

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("AppleStore backend is running 🚀");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
