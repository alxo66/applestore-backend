const express = require("express");
const axios = require("axios");
const router = express.Router();

const CRYPTO_PAY_API = "https://pay.crypt.bot/api/createInvoice";

router.post("/", async (req, res) => {
    try {
        // Извлекаем данные. Фронтенд присылает 'amount' и 'currency'
        const { amount, currency } = req.body; 
        const token = process.env.CRYPTO_PAY_TOKEN;

        console.log(`Попытка создания счета: ${amount} ${currency}`);

        if (!token) {
            console.error("ОШИБКА: CRYPTO_PAY_TOKEN не найден в Variables Railway");
            return res.status(500).json({ error: "Сервер не настроен для оплаты" });
        }

        // Запрос к CryptoBot
        const response = await axios.post(CRYPTO_PAY_API, {
            asset: currency, // BTC, ETH, USDT, TON
            amount: amount.toString(),
            description: `Пополнение счета в Apple Store (ID: ${req.userId})`,
            paid_btn_name: "openBot",
            paid_btn_url: "https://applesite-phi.vercel.app/cabinet.html"
        }, {
            headers: { "Crypto-Pay-API-Token": token }
        });

        if (response.data && response.data.ok) {
            console.log("Инвойс успешно создан:", response.data.result.pay_url);
            // Возвращаем объект с полем pay_url, которое ждет фронтенд
            res.json({ pay_url: response.data.result.pay_url });
        } else {
            console.error("CryptoBot вернул ошибку:", response.data);
            res.status(400).json({ error: "Криптобот отклонил запрос" });
        }
    } catch (error) {
        console.error("Ошибка при связи с CryptoBot API:", error.response?.data || error.message);
        res.status(500).json({ error: "Внутренняя ошибка сервера оплаты" });
    }
});

module.exports = router;
