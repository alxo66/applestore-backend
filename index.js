const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Тот самый массив с ПРАВИЛЬНЫМИ ссылками
const products = [
    // iPhone 17 Series
    { id: "i17promax", title: "iPhone 17 Pro Max", price: 1199, description: "Будущее в титановом корпусе.", specs: ["Экран 6.9\"", "A19 Pro", "5x Zoom"], image: "https://static.re-store.ru/upload/resize_cache/iblock/3e7/100500_800_140cd750bba9870f18aada2478b24840a/c6b0ndzv7rqf8u9c456xwvgolvkkdf11.jpg" },
    { id: "i17pro", title: "iPhone 17 Pro", price: 999, description: "Профессиональная мощь.", specs: ["A19 Pro", "6.3\"", "120Hz"], image: "https://static.re-store.ru/upload/resize_cache/iblock/425/100500_800_140cd750bba9870f18aada2478b24840a/63zba8vr1pr1qx83hjr8hq3qd76uj8of.jpg" },
    { id: "i17", title: "iPhone 17", price: 799, description: "Новый стандарт.", specs: ["A19 Bionic", "6.1\"", "48Mp"], image: "https://static.re-store.ru/upload/resize_cache/iblock/2f7/100500_800_140cd750bba9870f18aada2478b24840a/d3tf4gy4fvsh1uacmwk9cvfx576r6hfp.jpg" },

    // iPhone 16 Series
    { id: "i16promax", title: "iPhone 16 Pro Max", price: 1099, description: "Apple Intelligence.", specs: ["A18 Pro", "Титановый корпус", "Camera Control"], image: "https://static.re-store.ru/upload/resize_cache/iblock/e7a/100500_800_140cd750bba9870f18aada2478b24840a/3fkzizh2j3ecnj83n008g53uk15biuup.jpg" },
    { id: "i16pro", title: "iPhone 16 Pro", price: 999, description: "Мощь в компактном размере.", specs: ["A18 Pro", "4K 120fps"], image: "https://static.re-store.ru/upload/resize_cache/iblock/ca9/100500_800_140cd750bba9870f18aada2478b24840a/1um5lfka1r127hpc1c6y2r73q4x2l339.jpg" },
    { id: "i16", title: "iPhone 16", price: 799, description: "Новая эра Apple.", specs: ["A18 Chip", "Action Button"], image: "https://static.re-store.ru/upload/resize_cache/iblock/938/100500_800_140cd750bba9870f18aada2478b24840a/0nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg" },
    { id: "i16plus", title: "iPhone 16 Plus", price: 899, description: "Большой экран, большая батарея.", specs: ["A18", "6.7\""], image: "https://static.re-store.ru/upload/resize_cache/iblock/e54/100500_800_140cd750bba9870f18aada2478b24840a/2ejqmg2ifqb3bmoya38k9u3owbqygrz1.jpg" },

    // iPhone 15 Series
    { id: "i15promax", title: "iPhone 15 Pro Max", price: 899, description: "Первый титановый iPhone.", specs: ["A17 Pro", "USB-C"], image: "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/81ysro3zyue28kqvn357mugae05nsgvl.jpg" },
    { id: "i15pro", title: "iPhone 15 Pro", price: 799, description: "Компактный титан.", specs: ["A17 Pro", "USB-C"], image: "https://static.re-store.ru/upload/resize_cache/iblock/92c/100500_800_140cd750bba9870f18aada2478b24840a/e79u588p4583y83sno6z646l96n6o6b6.jpg" },
    { id: "i15", title: "Apple iPhone 15 Plus", price: 599, description: "Dynamic Island для всех.", specs: ["512GB"], image: "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/sbp132akcddo5g2yvmjvofpib40b6c41.jpg" },

    // iPads
    { id: "ipadpro", title: "Apple iPad Pro 13 (2025)", price: 999, description: "Тонкий. Мощный. OLED.", specs: ["M5, Wi-Fi"], image: "https://static.re-store.ru/upload/resize_cache/iblock/c31/100500_800_140cd750bba9870f18aada2478b24840a/3a89519konnv8x0gnp2cry8q8mnd6a88.jpg" },
    { id: "ipadair", title: "Apple iPad Air (2025)", price: 599, description: "Мощь для творчества.", specs: ["M3 13" 128 ГБ\""], image: "https://static.re-store.ru/upload/resize_cache/iblock/256/100500_800_140cd750bba9870f18aada2478b24840a/forvpclwmz5f57hgg70ch0ieawax9f7u.png" },
    { id: "ipadmini", title: "Apple iPad mini (2024)", price: 499, description: "Мощь в твоем кармане.", specs: ["8,3" 256 ГБ\""], image: "https://static.re-store.ru/upload/resize_cache/iblock/077/100500_800_140cd750bba9870f18aada2478b24840a/qm5ed6nwk1mlcxmdm9i3xeq5gq56dyyl.jpg" },

    // MacBooks
    { id: "mbp14", title: "Apple MacBook Air 13\"", price: 1599, description: "Для профи.", specs: ["M4, 10C CPU/10C GPU, 2025), 16 ГБ, 512 ГБ SSD"], image: "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg" },
    { id: "m4air13", title: "Apple MacBook Air 13\"", price: 1099, description: "Тонкий и мощный.", specs: ["M4, 10C CPU/10C GPU, 2025), 16 ГБ, 512 ГБ SSD"], image: "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg" },
    { id: "mbp16", title: "Apple MacBook Pro 14\"", price: 2499, description: "Максимум производительности.", specs: ["M5 10C CPU, 10C GPU, 2025) 24 ГБ, 1 ТБ SSD"], image: "https://static.re-store.ru/upload/resize_cache/iblock/a9e/100500_800_140cd750bba9870f18aada2478b24840a/ehkghuinyu3z0ib89z6j3x1cz2jguk08.jpg" }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

// Добавь сюда остальные роуты (createOrder и т.д.)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
