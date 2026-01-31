import express from "express";
import { getRates } from "../services/rates.js";
import { generateQR } from "../services/qr.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const wallets = {
    BTC: process.env.BTC_ADDRESS,
    ETH: process.env.ETH_ADDRESS,
    USDT: process.env.USDT_ADDRESS,
    TON: process.env.TON_ADDRESS
  };

  const rates = await getRates();

  const result = {};
  for (const coin of Object.keys(wallets)) {
    result[coin] = {
      address: wallets[coin],
      qr: await generateQR(wallets[coin]),
      rateRub: rates[coin]
    };
  }

  res.json(result);
});

export default router;
