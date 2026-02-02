const express = require("express");
const axios = require("axios");
const router = express.Router();

const CRYPTO_PAY_API = "https://pay.crypt.bot/api/createInvoice";

router.post("/", async (req, res) => {
    try {
        const { amount, currency } = req.body; // 'amount' теперь в USDT
        const token = process.env.CRYPTO_PAY_TOKEN;

        // Если пользователь выбрал USDT, мы шлем напрямую.
        // Если выбрал BTC/TON/ETH, CryptoBot создаст счет в этой валюте.
        // Но есть нюанс: CryptoBot ожидает 'amount' именно в той валюте, которая в 'asset'.
        // Чтобы сделать автоконвертацию из USDT в TON/BTC, нужно использовать метод 'getExchangeRates'
        
        let finalAmount = amount;
        
        if (currency !== "USDT") {
            const ratesResponse = await axios.get("https://pay.crypt.bot/api/getExchangeRates", {
                headers: { "Crypto-Pay-API-Token": token }
            });
            
            if (ratesResponse.data.ok) {
                // Ищем курс выбранной валюты к USDT
                // Обычно курс идет как TON/USDT
                const rate = ratesResponse.data.result.find(r => r.source === currency && r.target === "USDT" && r.is_valid);
                if (rate) {
                    finalAmount = (amount / rate.rate).toFixed(8);
                }
            }
        }

        const response = await axios.post(CRYPTO_PAY_API, {
            asset: currency, 
            amount: finalAmount.toString(),
            description: `Пополнение баланса Apple Store (Сумма: ${amount} USDT)`,
            paid_btn_name: "openBot",
            paid_btn_url: "https://applesite-phi.vercel.app/cabinet.html"
        }, {
            headers: { "Crypto-Pay-API-Token": token }
        });

        if (response.data.ok) {
            res.json({ pay_url: response.data.result.pay_url });
        } else {
            res.status(400).json({ error: "Ошибка API CryptoBot" });
        }
    } catch (error) {
        console.error("Conversion/Invoice Error:", error.message);
        res.status(500).json({ error: "Ошибка при расчете курса" });
    }
});

module.exports = router;
