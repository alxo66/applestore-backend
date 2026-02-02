const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 1. База данных в оперативной памяти
// ВНИМАНИЕ: При перезагрузке сервера на Railway данные сбросятся. 
// Для реального проекта позже добавим MongoDB/PostgreSQL.
const users = {}; 

// 2. Middleware для авторизации
const authMiddleware = (req, res, next) => {
    const userId = req.headers["x-user-id"];
    if (!userId) return res.status(401).json({ error: "NO_USER" });
    
    // Если пользователя нет в базе — создаем его профиль
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

// 3. Импорт роутов (убедись, что файл ./routes/deposit.js существует)
const depositRoute = require("./routes/deposit.js");

// 4. Актуальный список товаров
const products = [
    { id: "i17promax", title: "iPhone 17 Pro Max", price: 1199, description: "Будущее в титановом корпусе.", specs: ["Экран 6.9\"", "A19 Pro", "5x Zoom"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16_pro__9ba8659sh6u_large.jpg" },
    { id: "i16promax", title: "iPhone 16 Pro Max", price: 1099, description: "Apple Intelligence и Camera Control.", specs: ["A18 Pro", "Титановый корпус", "Camera Control"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16_pro__9ba8659sh6u_large.jpg" },
    { id: "i16pro", title: "iPhone 16 Pro", price: 999, description: "Мощь Pro в компактном размере.", specs: ["A18 Pro", "Дисплей 6.3\"", "4K 120fps"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16_pro__9ba8659sh6u_large.jpg" },
    { id: "i16e", title: "iPhone 16e", price: 599, description: "Самый доступный iPhone 16.", specs: ["A18 Chip", "Apple Intelligence", "Ультратонкий"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16__9u7m99i8jn6u_large.jpg" },
    { id: "i16plus", title: "iPhone 16 Plus", price: 899, description: "Большой экран и мощная батарея.", specs: ["Экран 6.7\"", "A18 Chip", "Camera Control"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16__9u7m99i8jn6u_large.jpg" },
    { id: "i16", title: "iPhone 16", price: 799, description: "Новая эра Apple Intelligence.", specs: ["A18 Chip", "Камера 48Мп", "Action Button"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16__9u7m99i8jn6u_large.jpg" },
    { id: "ipadpro", title: "iPad Pro M4", price: 999, description: "Тонкий. Мощный. OLED.", specs: ["Чип M4", "Ultra Retina XDR", "Face ID"], image: "https://www.apple.com/v/ipad/home/ce/images/overview/select/ipad_pro__df66u8p7qsyu_large.jpg" },
    { id: "mbp14", title: "MacBook Pro 14\"", price: 1599, description: "Для самых сложных задач.", specs: ["Чип M4 Pro", "Liquid Retina XDR", "24ч работы"], image: "https://www.apple.com/v/macbook-pro/home/aj/images/overview/select/product_tile_mbp_14__dir9jg9mvy6u_large.jpg" }
];

// 5. Роуты API
app.get("/", (req, res) => res.send("AppleStore Backend is Working"));

// Получить товары
app.get("/api/products", (req, res) => res.json(products));

// Получить баланс
app.get("/api/balance", authMiddleware, (req, res) => {
    res.json({ balance: req.user.balance });
});

// Получить историю заказов
app.get("/api/orders", authMiddleware, (req, res) => {
    res.json(req.user.orders);
});

// Создать заказ (покупка)
app.post("/api/order", authMiddleware, (req, res) => {
    const { productId, price, title } = req.body;
    
    if (req.user.balance < price) {
        return res.json({ success: false, error: "NO_BALANCE" });
    }

    req.user.balance -= price;
    
    const order = {
        id: "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        title: title,
        price: price,
        date: new Date().toLocaleString(),
        status: "Оплачено"
    };

    req.user.orders.unshift(order);
    res.json({ success: true, order });
});

// Пополнение баланса (роутер из файла deposit.js)
app.use("/api/deposit", authMiddleware, depositRoute);

// 6. Webhook для CryptoBot
app.post("/api/webhook/cryptopay", (req, res) => {
    const { update_type, payload } = req.body;

    if (update_type === "invoice_paid") {
        const invoice = payload;
        const description = invoice.description || "";
        
        // Вытаскиваем ID пользователя из описания: (ID: user_xxx)
        const userIdMatch = description.match(/\(ID: (.*?)\)/);
        const usdtAmountMatch = description.match(/Сумма: ([\d.]+) USDT/);

        const userId = userIdMatch ? userIdMatch[1] : null;
        const amountToCredit = usdtAmountMatch ? parseFloat(usdtAmountMatch[1]) : parseFloat(invoice.amount);

        if (userId && users[userId]) {
            users[userId].balance += amountToCredit;
            
            users[userId].deposits.unshift({
                amount: amountToCredit,
                currency: invoice.asset,
                date: new Date().toLocaleString(),
                status: "Зачислено"
            });

            console.log(`[OK] ${amountToCredit} USDT -> ${userId}`);
        }
    }
    res.status(200).send("OK");
});

// 7. Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> AppleStore Backend ACTIVE on port ${PORT}`);
});
