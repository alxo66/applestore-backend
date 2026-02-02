const express = require("express");
const axios = require("axios"); // Не забудь npm install axios
const router = express.Router();

const CRYPTO_PAY_API = "https://pay.crypt.bot/api/createInvoice";

router.post("/", async (req, res) => {
    try {
        const { amount, asset } = req.body; // Получаем сумму и валюту (USDT, TON и т.д.)
        const token = process.env.CRYPTO_PAY_TOKEN;

        if (!token) {
            return res.status(500).json({ error: "API токен не настроен на сервере" });
        }

        const response = await axios.post(CRYPTO_PAY_API, {
            asset: asset,
            amount: amount.toString(),
            description: "Пополнение баланса Apple Store",
            paid_btn_name: "openBot",
            // Куда вернуть пользователя после оплаты (твоя страница кабинета)
            paid_btn_url: "https://applesite-phi.vercel.app/cabinet.html" 
        }, {
            headers: { "Crypto-Pay-API-Token": token }
        });

        if (response.data.ok) {
            // Отправляем фронтенду реальную ссылку на оплату
            res.json({ pay_url: response.data.result.pay_url });
        } else {
            res.status(400).json({ error: "CryptoBot отклонил запрос" });
        }
    } catch (error) {
        console.error("Ошибка API:", error.response?.data || error.message);
        res.status(500).json({ error: "Ошибка при создании счета" });
    }
});

module.exports = router;
