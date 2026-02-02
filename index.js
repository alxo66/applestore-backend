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
    { id: "i15", title: "iPhone 15", price: 599, description: "Dynamic Island для всех.", specs: ["A16", "USB-C"], image: "https://static.re-store.ru/upload/resize_cache/iblock/73b/100500_800_140cd750bba9870f18aada2478b24840a/u87c14773c3b06362873428f572718134.jpg" },

    // iPhone 14 Series
    { id: "i14", title: "iPhone 14", price: 499, description: "Проверенная классика.", specs: ["A15", "FaceID"], image: "https://static.re-store.ru/upload/resize_cache/iblock/e73/100500_800_140cd750bba9870f18aada2478b24840a/e73b1853610214a1a367468641121633d.jpg" },
    { id: "i14plus", title: "iPhone 14 Plus", price: 599, description: "Максимум за свои деньги.", specs: ["A15", "6.7\""], image: "https://static.re-store.ru/upload/resize_cache/iblock/127/100500_800_140cd750bba9870f18aada2478b24840a/1271168f1f7274092497645f061f94d9.jpg" },

    // iPads
    { id: "ipadpro", title: "iPad Pro M4", price: 999, description: "Тонкий. Мощный. OLED.", specs: ["Чип M4", "Ultra Retina"], image: "https://static.re-store.ru/upload/resize_cache/iblock/21d/100500_800_140cd750bba9870f18aada2478b24840a/21d3f9b23f2f84b6f122864f7b4916a2.jpg" },
    { id: "ipadair", title: "iPad Air M2", price: 599, description: "Мощь для творчества.", specs: ["Чип M2", "11\""], image: "https://static.re-store.ru/upload/resize_cache/iblock/93a/100500_800_140cd750bba9870f18aada2478b24840a/93a058449c951978939678129759495c.jpg" },
    { id: "ipadmini", title: "iPad mini 6", price: 499, description: "Мощь в твоем кармане.", specs: ["A15", "8.3\""], image: "https://static.re-store.ru/upload/resize_cache/iblock/73b/100500_800_140cd750bba9870f18aada2478b24840a/73b1853610214a1a367468641121633d.jpg" },

    // MacBooks
    { id: "mbp14", title: "MacBook Pro 14\"", price: 1599, description: "Для профи.", specs: ["M4 Pro", "XDR Display"], image: "https://static.re-store.ru/upload/resize_cache/iblock/873/100500_800_140cd750bba9870f18aada2478b24840a/873058449c951978939678129759495c.jpg" },
    { id: "m4air13", title: "MacBook Air 13\"", price: 1099, description: "Тонкий и мощный.", specs: ["M4 Chip", "Безвентиляторный"], image: "https://static.re-store.ru/upload/resize_cache/iblock/a87/100500_800_140cd750bba9870f18aada2478b24840a/a8739401929491249129412941294129.jpg" },
    { id: "mbp16", title: "MacBook Pro 16\"", price: 2499, description: "Максимум производительности.", specs: ["M4 Max", "32GB RAM"], image: "https://static.re-store.ru/upload/resize_cache/iblock/427/100500_800_140cd750bba9870f18aada2478b24840a/427058449c951978939678129759495c.jpg" }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

// Добавь сюда остальные роуты (createOrder и т.д.)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
