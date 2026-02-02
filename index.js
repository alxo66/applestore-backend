const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// 1. Настройки
app.use(cors());
app.use(express.json());

// 2. Импорт существующих модулей (из папки services)
// Эти файлы у вас есть в репозитории applestore-backend
const telegram = require("./services/telegram");
const qr = require("./services/qr");
const rates = require("./services/rates");

// 3. Импорт роутов
const depositRoute = require("./routes/deposit");

// 4. Временная база данных (заменяет отсутствующие файлы products.js и orders.js)
const products = [
    { 
        id: "iphone16", 
        title: "iPhone 16", 
        price: 79990, 
        description: "Новый iPhone 16 с OLED-дисплеем и A18", 
        image: "https://v-stroy.ru/upload/iblock/c38/c38096f920f69903b41427c62d057774.jpg" 
    },
    { 
        id: "iphone16pro", 
        title: "iPhone 16 Pro", 
        price: 99990, 
        description: "Титановый корпус, Pro-камера", 
        image: "https://v-stroy.ru/upload/iblock/179/1791f9b3b88b26477960309c85671182.jpg" 
    }
];

const users = {}; // Хранилище в памяти (очистится при перезагрузке Railway)

// 5. Middleware авторизации
const authMiddleware = (req, res, next) => {
    const userId = req.headers["x-user-id"];
    if (!userId) return res.status(401).json({ error: "NO_USER" });

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

// 6. Роуты API
app.get("/", (req, res) => res.send("AppleStore API is running..."));

// Публичный список товаров
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Защищенные роуты
app.get("/api/balance", authMiddleware, (req, res) => {
    res.json({ balance: req.user.balance });
});

app.get("/api/orders", authMiddleware, (req, res) => {
    res.json(req.user.orders);
});

app.post("/api/order", authMiddleware, (req, res) => {
    const { productId, price, title } = req.body;
    
    if (req.user.balance < price) {
        return res.status(400).json({ error: "INSUFFICIENT_FUNDS" });
    }

    req.user.balance -= price;
    const order = {
        id: Date.now(),
        productId,
        title,
        price,
        date: new Date()
    };
    req.user.orders.push(order);
    
    res.json({ success: true, order });
});

// Роут депозита (подключаем ваш файл из routes/deposit.js)
app.post("/api/deposit", authMiddleware, depositRoute);

// 7. Запуск
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend started on port ${PORT}`);
});
