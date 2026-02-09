const express = require("express");
const axios = require("axios");
const router = express.Router();

const CRYPTO_PAY_API = "https://pay.crypt.bot/api/createInvoice";
const RATES_API = "https://pay.crypt.bot/api/getExchangeRates";

// Изменяем "/" на "/deposit", чтобы запрос из фронта /api/deposit попадал сюда
router.post("/deposit", async (req, res) => {
    try {
        const { amount, currency } = req.body; 
        const token = process.env.CRYPTO_PAY_TOKEN;

        // Проверка: если токена нет, не мучаем API
        if (!token) {
            console.error("[ERROR] CRYPTO_PAY_TOKEN отсутствует в Environment Variables!");
            return res.status(500).json({ error: "Ошибка конфигурации сервера (нет токена)" });
        }

        console.log(`[DEPOSIT] Запрос: ${amount}$ в валюте ${currency}`);

        let finalAmount = parseFloat(amount);

        // Конвертация, если не USDT
        if (currency !== "USDT") {
            const ratesResponse = await axios.get(RATES_API, {
                headers: { "Crypto-Pay-API-Token": token }
            });

            if (ratesResponse.data.ok) {
                const rates = ratesResponse.data.result;
                const rateInfo = rates.find(r => r.source === currency && (r.target === "USD" || r.target === "USDT") && r.is_valid);

                if (rateInfo) {
                    const currentRate = parseFloat(rateInfo.rate);
                    finalAmount = (amount / currentRate).toFixed(8);
                    console.log(`[CONVERSION] Курс ${currency}/USD: ${currentRate}. Итог: ${finalAmount} ${currency}`);
                } else {
                    console.error(`[ERROR] Не найден курс для ${currency}`);
                    return res.status(400).json({ error: `Не удалось рассчитать курс для ${currency}` });
                }
            }
        }

        // Создаем инвойс
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
            console.log(`[SUCCESS] Инвойс создан: ${response.data.result.pay_url}`);
            res.json({ pay_url: response.data.result.pay_url });
        } else {
            console.error("CryptoBot API Error:", response.data);
            res.status(400).json({ error: "CryptoBot отклонил создание счета" });
        }
    } catch (error) {
        console.error("Full Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Ошибка сервера при создании платежа" });
    }
});

module.exports = router;
