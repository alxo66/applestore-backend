const express = require("express");
const cors = require("cors");
const path = require("path");

// Инициализируем приложение ПЕРВЫМ
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Импорт твоих модулей (проверь пути!)
// Если файлы лежат прямо в корне (как на фото 1), оставляй так:
const products = require("./products");
const payments = require("./payments");
const orders = require("./orders");

// Простая проверка работоспособности (Health Check)
app.get("/", (req, res) => res.send("AppleStore Backend is Online"));

// Роуты
app.get("/api/products", (req, res) => {
    // Если products.list — это функция, вызываем её
    if (products.list) return products.list(req, res);
    res.json([{ id: 1, title: "Ошибка конфигурации", price: 0 }]);
});

// Middleware для авторизации
app.use((req, res, next) => {
    const userId = req.headers["x-user-id"];
    if (!userId && req.path.startsWith("/api/")) {
        // Разрешаем только публичные запросы без ID
        if (req.path === "/api/products") return next();
        return res.status(401).json({ error: "NO_USER" });
    }
    req.userId = userId;
    next();
});

// Остальные роуты
app.post("/api/deposit", payments.deposit || ((req, res) => res.status(501).send()));
app.post("/api/order", orders.create || ((req, res) => res.status(501).send()));
app.get("/api/balance", payments.balance || ((req, res) => res.status(501).send()));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on port ${PORT}`);
});
