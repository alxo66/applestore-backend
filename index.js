const express = require("express");
const cors = require("cors");
const products = require("./products");
const payments = require("./payments");
const orders = require("./orders");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Хранилище пользователей в памяти
const users = {}; 

// Middleware для авторизации по x-user-id
const authMiddleware = (req, res, next) => {
    const userId = req.headers["x-user-id"];
    if (!userId) {
        return res.status(401).json({ error: "NO_USER_ID_PROVIDED" });
    }

    if (!users[userId]) {
        users[userId] = {
            balance: 0,
            deposits: [],
            orders: []
        };
    }

    req.user = users[userId];
    req.userId = userId;
    next();
};

// Публичные роуты
app.get("/api/products", products.list);

// Защищенные роуты
app.use("/api", authMiddleware); // Применяем auth ко всем /api/ путям ниже

app.post("/api/deposit", payments.deposit);
app.get("/api/balance", payments.balance);
app.get("/api/deposits", payments.deposits);

app.post("/api/order", orders.create);
app.get("/api/orders", orders.list);

// Обработка несуществующих маршрутов
app.use((req, res) => {
    res.status(404).json({ error: "NOT_FOUND" });
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`>>> Backend running on port ${PORT}`);
});
