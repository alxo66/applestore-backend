const express = require("express");
const axios = require("axios");
const router = express.Router();

const CRYPTO_PAY_API = "https://pay.crypt.bot/api/createInvoice";
const RATES_API = "https://pay.crypt.bot/api/getExchangeRates";

router.post("/", async (req, res) => {
    try {
        const { amount, currency } = req.body; // amount в долларах (например 100)
        const token = process.env.CRYPTO_PAY_TOKEN;

        console.log(`[DEPOSIT] Запрос: ${amount}$ в валюте ${currency}`);

        let finalAmount = parseFloat(amount);

        // Если выбрана крипта, отличная от USDT, делаем конвертацию
        if (currency !== "USDT") {
            const ratesResponse = await axios.get(RATES_API, {
                headers: { "Crypto-Pay-API-Token": token }
            });

            if (ratesResponse.data.ok) {
                // Ищем курс пары (например, TON к USD или TON к USDT)
                // CryptoBot обычно отдает курсы в формате source: "TON", target: "USD"
                const rates = ratesResponse.data.result;
                const rateInfo = rates.find(r => r.source === currency && (r.target === "USD" || r.target === "USDT") && r.is_valid);

                if (rateInfo) {
                    const currentRate = parseFloat(rateInfo.rate);
                    finalAmount = (amount / currentRate).toFixed(8);
                    console.log(`[CONVERSION] Курс ${currency}/USD: ${currentRate}. Итог: ${finalAmount} ${currency}`);
                } else {
                    console.error(`[ERROR] Не найден курс для ${currency}`);
                }
            }
        }

        // Создаем инвойс
        const response = await axios.post(CRYPTO_PAY_API, {
            asset: currency, 
            amount: finalAmount.toString(),
            description: `Пополнение баланса Apple Store (Сумма: ${amount} USDT) (ID: ${req.userId})`,
            paid_btn_name: "openBot",
            paid_btn_url: "https://applesite-phi.vercel.app/cabinet.html"
        }, {
            headers: { "Crypto-Pay-API-Token": token }
        });

        if (response.data.ok) {
            res.json({ pay_url: response.data.result.pay_url });
        } else {
            console.error("CryptoBot Error:", response.data);
            res.status(400).json({ error: "Ошибка создания счета" });
        }
    } catch (error) {
        console.error("Full Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Ошибка сервера при расчете курса" });
    }
});

module.exports = router;
