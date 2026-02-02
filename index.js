const express = require("express");
const cors = require("cors");

// Инициализация приложения
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Импорт существующих сервисов из папки services
const rates = require("./services/rates");
const qr = require("./services/qr");
const telegram = require("./services/telegram");

// Импорт роутов
const depositRoute = require("./routes/deposit");

// Имитация базы данных (так как файлов products/orders нет в этом репозитории)
const products = [
    { id: "iphone16", title: "iPhone 16", price: 79990, description: "Новый iPhone 16 с OLED-дисплеем и A18", image: "https://v-stroy.ru/upload/iblock/c38/c38096f920f69903b41427c62d057774.jpg" },
    { id: "iphone16pro", title: "iPhone 16 Pro", price: 99990, description: "Титановый корпус, Pro-камера", image: "https://v-stroy.ru/upload/iblock/179/1791f9b3b88b26477960309c85671182.jpg" }
];

const users = {}; 

// Middleware для авторизации
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

// --- ПУБЛИЧНЫЕ РОУТЫ ---

// Получение списка товаров
app.get("/api/products", (req, res) => {
    res.json(products);
});

// --- ЗАЩИЩЕННЫЕ РОУТЫ ---

// Баланс пользователя
app.get("/api/balance", authMiddleware, (req, res) => {
    res.json({ balance: req.user.balance });
});

// История депозитов
app.get("/api/deposits", authMiddleware, (req, res) => {
    res.json(req.user.deposits);
});

// Создание заказа
app.post("/api/order", authMiddleware, (req, res) => {
    const { productId, price, title } = req.body;
    
    if (req.user.balance < price) {
        return res.status(400).json({ error: "INSUFFICIENT_FUNDS" });
    }

    req.user.balance -= price;
    const order = { id: Date.now(), productId, title, price, status: "completed" };
    req.user.orders.push(order);
    
    res.json({ success: true, order });
});

// Список заказов
app.get("/api/orders", authMiddleware, (req, res) => {
    res.json(req.user.orders);
});

// Пополнение (используем ваш существующий роут из routes/deposit.js)
// ВАЖНО: убедитесь, что в deposit.js экспорт через module.exports = function(req, res) {...}
app.post("/api/deposit", authMiddleware, depositRoute);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> Backend is running on port ${PORT}`);
});
