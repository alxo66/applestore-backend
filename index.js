const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const users = {}; 

const products = [
    // iPhone 17 Series
    { id: "i17promax", title: "iPhone 17 Pro Max", price: 1199, description: "Будущее в титановом корпусе.", specs: ["Экран 6.9\"", "A19 Pro", "5x Zoom"], image: "https://static.re-store.ru/upload/resize_cache/iblock/3e7/100500_800_140cd750bba9870f18aada2478b24840a/c6b0ndzv7rqf8u9c456xwvgolvkkdf11.jpg" },
    { id: "i17pro", title: "iPhone 17 Pro", price: 999, description: "Профессиональная мощь.", specs: ["A19 Pro", "6.3\"", "120Hz"], image: "https://static.re-store.ru/upload/resize_cache/iblock/eac/100500_800_140cd750bba9870f18aada2478b24840a/irjuxxbba1paqoho9p0diyjyy0f40lxm.jpg" },
    { id: "i17", title: "iPhone 17", price: 799, description: "Новый стандарт.", specs: ["A19 Bionic", "6.1\"", "48Mp"], image: "https://static.re-store.ru/upload/resize_cache/iblock/908/100500_800_140cd750bba9870f18aada2478b24840a/wcrl0q67e1x6akxtyi0690ym4r3kfme6.jpg" },

    // iPhone 16 Series
    { id: "i16promax", title: "iPhone 16 Pro Max", price: 1099, description: "Apple Intelligence.", specs: ["A18 Pro", "Титановый корпус", "Camera Control"], image: "https://static.re-store.ru/upload/resize_cache/iblock/e7a/100500_800_140cd750bba9870f18aada2478b24840a/3fkzizh2j3ecnj83n008g53uk15biuup.jpg" },
    { id: "i16pro", title: "iPhone 16 Pro", price: 999, description: "Мощь в компактном размере.", specs: ["A18 Pro", "4K 120fps"], image: "https://static.re-store.ru/upload/resize_cache/iblock/ca9/100500_800_140cd750bba9870f18aada2478b24840a/1um5lfka1r127hpc1c6y2r73q4x2l339.jpg" },
    { id: "i16", title: "iPhone 16", price: 799, description: "Новая эра Apple.", specs: ["A18 Chip", "Action Button"], image: "https://static.re-store.ru/upload/resize_cache/iblock/938/100500_800_140cd750bba9870f18aada2478b24840a/0nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg" },
    { id: "i16plus", title: "iPhone 16 Plus", price: 899, description: "Большой экран, большая батарея.", specs: ["A18", "6.7\""], image: "https://static.re-store.ru/upload/resize_cache/iblock/e54/100500_800_140cd750bba9870f18aada2478b24840a/2ejqmg2ifqb3bmoya38k9u3owbqygrz1.jpg" },

    // iPhone 15 Series
    { id: "i15promax", title: "iPhone 15 Pro Max", price: 899, description: "Первый титановый iPhone.", specs: ["A17 Pro", "USB-C"], image: "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/81ysro3zyue28kqvn357mugae05nsgvl.jpg" },
    { id: "i15", title: "iPhone 15", price: 599, description: "Dynamic Island для всех.", specs: ["A16", "USB-C"], image: "https://static.re-store.ru/upload/resize_cache/iblock/fc1/100500_800_140cd750bba9870f18aada2478b24840a/m6p2v42kxrzpd3a7ls5nq91z2odotg4c.jpg" },

    // iPads
    { id: "ipadpro", title: "iPad Pro M5", price: 999, description: "Тонкий. Мощный. OLED.", specs: ["Apple iPad Pro 13" (M5, 2025) Wi-Fi"], image: "https://static.re-store.ru/upload/resize_cache/iblock/0f9/100500_800_140cd750bba9870f18aada2478b24840a/6ta82kw42no8trmkawthmzj2h51wdy98.jpg" },
    { id: "ipadair", title: "iPad Air M2", price: 599, description: "Мощь для творчества.", specs: ["Apple iPad Air (2025) M3 13" Wi-Fi ""], image: "https://static.re-store.ru/upload/resize_cache/iblock/455/100500_800_140cd750bba9870f18aada2478b24840a/yma5t6fq3oi0hy4bn3bfinqu6h4uz68h.jpg" },
    { id: "ipadmini", title: "iPad mini 6", price: 499, description: "Мощь в твоем кармане.", specs: ["Apple iPad mini (2024) Wi-Fi""], image: "https://static.re-store.ru/upload/resize_cache/iblock/3df/100500_800_140cd750bba9870f18aada2478b24840a/tvnquvz76rkksg3p1qoek8al56gz1cmh.jpg" },

    // MacBooks
    { id: "mbp14", title: "Apple MacBook Air 15" (M4, 10C CPU/10C GPU, 2025), 16 ГБ, 512 ГБ SSD\"", price: 1599, description: "Для профи.", specs: ["M4 Pro", "XDR Display"], image: "https://static.re-store.ru/upload/resize_cache/iblock/dae/100500_800_140cd750bba9870f18aada2478b24840a/1m9j178f3zz912j20u38sm1w8wymwhzm.jpg" },
    { id: "m4air13", title: "Apple MacBook Air 13"\"", price: 1099, description: "Тонкий и мощный.", specs: ["Apple MacBook Air 13" (M4, 10C CPU/10C GPU, 2025), 24 ГБ, 512 ГБ SSD"], image: "https://static.re-store.ru/upload/resize_cache/iblock/657/100500_800_140cd750bba9870f18aada2478b24840a/hyol2m5nth7lfjecbosbnufl2cwd6v4u.jpg" },
    { id: "mbp16", title: "Apple MacBook Pro 14"\"", price: 2499, description: "Максимум производительности.", specs: ["Apple MacBook Pro 14" (M5 10C CPU, 10C GPU, 2025) 24 ГБ, 1 ТБ SSD"], image: "https://static.re-store.ru/upload/resize_cache/iblock/a9e/100500_800_140cd750bba9870f18aada2478b24840a/ehkghuinyu3z0ib89z6j3x1cz2jguk08.jpg" }
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
