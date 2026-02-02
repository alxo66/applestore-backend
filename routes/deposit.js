const express = require("express");
const { getRates } = require("../services/rates.js");
const { generateQR } = require("../services/qr.js");

const router = express.Router();

// Меняем на POST, так как фронтенд отправляет данные (сумма, валюта)
router.post("/", async (req, res) => {
    try {
        const { amount, currency } = req.body; // Данные с фронтенда

        const wallets = {
            BTC: process.env.BTC_ADDRESS || "ВАШ_BTC_АДРЕС",
            ETH: process.env.ETH_ADDRESS || "ВАШ_ETH_АДРЕС",
            USDT: process.env.USDT_ADDRESS || "ВАШ_USDT_АДРЕС",
            TON: process.env.TON_ADDRESS || "ВАШ_TON_АДРЕС"
        };

        const rates = await getRates();
        const selectedWallet = wallets[currency] || wallets["USDT"];
        const currentRate = rates[currency] || rates["USDT"];

        // Расчет суммы в крипте (например, если пополняем на 1000 руб)
        const cryptoAmount = (amount / currentRate).toFixed(6);

        res.json({
            success: true,
            address: selectedWallet,
            amountCrypto: cryptoAmount,
            qr: await generateQR(selectedWallet),
            // Если ты используешь CryptoBot, здесь должна быть логика создания инвойса через их API
            // Для теста возвращаем ссылку (pay_url), которую ждет фронтенд
            pay_url: `https://t.me/CryptoBot?start=pay_${Date.now()}` 
        });
    } catch (error) {
        console.error("Deposit Error:", error);
        res.status(500).json({ error: "Ошибка сервера при создании счета" });
    }
});

module.exports = router; // ВАЖНО: используем module.exports для CommonJS
