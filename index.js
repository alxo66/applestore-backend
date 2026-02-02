const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const users = {}; 

const products = [
    // iPhone 17 Series (Используем концептуальные или актуальные про-модели для заглушки высокого качества)
    { id: "i17promax", title: "iPhone 17 Pro Max", price: 1199, description: "Будущее в титановом корпусе.", specs: ["Экран 6.9\"", "A19 Pro", "5x Zoom"], image: "https://static.re-store.ru/upload/resize_cache/iblock/3e7/800_800_1/c6b0ndzv7rqf8u9c456xwvgolvkkdf11.jpg" },
    { id: "i17pro", title: "iPhone 17 Pro", price: 999, description: "Профессиональная мощь.", specs: ["A19 Pro", "6.3\"", "120Hz"], image: "https://static.re-store.ru/upload/resize_cache/iblock/425/800_800_1/63zba8vr1pr1qx83hjr8hq3qd76uj8of.jpg" },
    { id: "i17", title: "iPhone 17", price: 799, description: "Новый стандарт.", specs: ["A19 Bionic", "6.1\"", "48Mp"], image: "https://static.re-store.ru/upload/resize_cache/iblock/2f7/800_800_1/d3tf4gy4fvsh1uacmwk9cvfx576r6hfp.jpg" },

    // iPhone 16 Series
    { id: "i16promax", title: "iPhone 16 Pro Max", price: 1099, description: "Apple Intelligence.", specs: ["A18 Pro", "Титановый корпус", "Camera Control"], image: "https://static.re-store.ru/upload/resize_cache/iblock/e7a/800_800_1/3fkzizh2j3ecnj83n008g53uk15biuup.jpg" },
    { id: "i16pro", title: "iPhone 16 Pro", price: 999, description: "Мощь в компактном размере.", specs: ["A18 Pro", "4K 120fps"], image: "https://static.re-store.ru/upload/resize_cache/iblock/ca9/800_800_1/1um5lfka1r127hpc1c6y2r73q4x2l339.jpg" },
    { id: "i16", title: "iPhone 16", price: 799, description: "Новая эра Apple.", specs: ["A18 Chip", "Action Button"], image: "https://static.re-store.ru/upload/resize_cache/iblock/938/800_800_1/0nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg" },
    { id: "i16plus", title: "iPhone 16 Plus", price: 899, description: "Большой экран, большая батарея.", specs: ["A18", "6.7\""], image: "https://static.re-store.ru/upload/resize_cache/iblock/e54/800_800_1/2ejqmg2ifqb3bmoya38k9u3owbqygrz1.jpg" },

    // iPhone 15 Series
    { id: "i15promax", title: "iPhone 15 Pro Max", price: 899, description: "Первый титановый iPhone.", specs: ["A17 Pro", "USB-C"], image: "https://static.re-store.ru/upload/resize_cache/iblock/7f3/800_800_1/7f3d538f5f6390141679051069f2129c.jpg" },
    { id: "i15pro", title: "iPhone 15 Pro", price: 799, description: "Компактный титан.", specs: ["A17 Pro", "USB-C"], image: "https://static.re-store.ru/upload/resize_cache/iblock/08b/800_800_1/08bc7418a099f7d025170d10d65561a3.jpg" },
    { id: "i15", title: "iPhone 15", price: 599, description: "Dynamic Island для всех.", specs: ["A16", "USB-C"], image: "https://static.re-store.ru/upload/resize_cache/iblock/2a4/800_800_1/2a4773c3b06362873428f572718134a6.jpg" },

    // iPhone 14 Series
    { id: "i14", title: "iPhone 14", price: 499, description: "Проверенная классика.", specs: ["A15", "FaceID"], image: "https://static.re-store.ru/upload/resize_cache/iblock/88b/800_800_1/88b50f79261314603370395642e316d8.jpg" },
    { id: "i14plus", title: "iPhone 14 Plus", price: 599, description: "Максимум за свои деньги.", specs: ["A15", "6.7\""], image: "https://static.re-store.ru/upload/resize_cache/iblock/127/800_800_1/1271168f1f7274092497645f061f94d9.jpg" },

    // iPads
    { id: "ipadpro", title: "iPad Pro M4", price: 999, description: "Тонкий. Мощный. OLED.", specs: ["Чип M4", "Ultra Retina"], image: "https://static.re-store.ru/upload/resize_cache/iblock/21d/800_800_1/21d3f9b23f2f84b6f122864f7b4916a2.jpg" },
    { id: "ipadair", title: "iPad Air M2", price: 599, description: "Мощь для творчества.", specs: ["Чип M2", "11\""], image: "https://static.re-store.ru/upload/resize_cache/iblock/93a/800_800_1/93a058449c951978939678129759495c.jpg" },
    { id: "ipadmini", title: "iPad mini 6", price: 499, description: "Мощь в твоем кармане.", specs: ["A15", "8.3\""], image: "https://static.re-store.ru/upload/resize_cache/iblock/73b/800_800_1/73b1853610214a1a367468641121633d.jpg" },

    // MacBooks
    { id: "mbp14", title: "MacBook Pro 14\"", price: 1599, description: "Для профи.", specs: ["M4 Pro", "XDR Display"], image: "https://static.re-store.ru/upload/resize_cache/iblock/873/800_800_1/873058449c951978939678129759495c.jpg" },
    { id: "m4air13", title: "MacBook Air 13\"", price: 1099, description: "Тонкий и мощный.", specs: ["M4 Chip", "Безвентиляторный"], image: "https://static.re-store.ru/upload/resize_cache/iblock/a87/800_800_1/a8739401929491249129412941294129.jpg" },
    { id: "mbp16", title: "MacBook Pro 16\"", price: 2499, description: "Максимум производительности.", specs: ["M4 Max", "32GB RAM"], image: "https://static.re-store.ru/upload/resize_cache/iblock/427/800_800_1/427058449c951978939678129759495c.jpg" }
];

const authMiddleware = (req, res, next) => {
    const userId = req.headers["x-user-id"];
    if (!userId) return res.status(401).json({ error: "NO_USER" });
    if (!users[userId]) users[userId] = { balance: 0, orders: [], deposits: [] };
    req.user = users[userId];
    req.userId = userId;
    next();
};

app.get("/api/products", (req, res) => res.json(products));
app.get("/api/balance", authMiddleware, (req, res) => res.json({ balance: req.user.balance }));
app.get("/api/orders", authMiddleware, (req, res) => res.json(req.user.orders));

app.post("/api/order", authMiddleware, (req, res) => {
    const { productId, price, title } = req.body;
    if (req.user.balance < price) return res.json({ success: false, error: "NO_BALANCE" });
    req.user.balance -= price;
    const order = { id: "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase(), title, price, date: new Date().toLocaleString(), status: "Оплачено" };
    req.user.orders.unshift(order);
    res.json({ success: true, order });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Backend run on port ${PORT}`));
