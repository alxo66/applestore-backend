const express = require("express");
const axios = require("axios"); // Убедись, что axios установлен
const router = express.Router();

const CRYPTO_PAY_API = "https://pay.crypt.bot/api/createInvoice";

router.post("/", async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const token = process.env.CRYPTO_PAY_TOKEN;

        if (!token) {
            console.error("ОШИБКА: CRYPTO_PAY_TOKEN не задан в Variables!");
            return res.status(500).json({ error: "Ошибка конфигурации оплаты" });
        }

        // Запрос к CryptoBot API для создания реального счета
        const response = await axios.post(CRYPTO_PAY_API, {
            asset: currency, // BTC, ETH, USDT, TON
            amount: amount.toString(),
            description: `Пополнение баланса Apple Store`,
            paid_btn_name: "openBot",
            paid_btn_url: "https://applesite-phi.vercel.app/cabinet" 
        }, {
            headers: { "Crypto-Pay-API-Token": token }
        });

        if (response.data.ok) {
            // Возвращаем реальную ссылку на оплату
            res.json({ pay_url: response.data.result.pay_url });
        } else {
            throw new Error("CryptoBot API вернул ошибку");
        }
    } catch (error) {
        console.error("Ошибка создания инвойса:", error.response?.data || error.message);
        res.status(500).json({ error: "Не удалось создать счет" });
    }
});

module.exports = router;
