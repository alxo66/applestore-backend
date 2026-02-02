const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// БЕЗОПАСНЫЙ ИМПОРТ: указываем полные пути с .js
const telegram = require("./services/telegram.js");
const rates = require("./services/rates.js");
app.use("/api/deposit", authMiddleware, depositRoute);

const users = {}; 

const authMiddleware = (req, res, next) => {
    const userId = req.headers["x-user-id"];
    if (!userId) return res.status(401).json({ error: "NO_USER" });
    if (!users[userId]) {
        users[userId] = { balance: 0, deposits: [], orders: [] };
    }
    req.user = users[userId];
    req.userId = userId;
    next();
};

// Товары (встроены прямо сюда, чтобы не искать файлы)
const products = [
    { id: "iphone16", title: "iPhone 16", price: 79990, image: "https://v-stroy.ru/upload/iblock/c38/c38096f920f69903b41427c62d057774.jpg" },
    { id: "iphone16pro", title: "iPhone 16 Pro", price: 99990, image: "https://v-stroy.ru/upload/iblock/179/1791f9b3b88b26477960309c85671182.jpg" }
];

app.get("/api/products", (req, res) => res.json(products));
app.get("/api/balance", authMiddleware, (req, res) => res.json({ balance: req.user.balance }));

// Подключаем пополнение
app.post("/api/deposit", authMiddleware, depositRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> Server is ACTIVE on port ${PORT}`);
});
