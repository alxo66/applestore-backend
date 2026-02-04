const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const products = [
    // iPhone 17 Series
    { 
        id: "i17promax", 
        title: "iPhone 17 Pro Max", 
        price: 1199, 
        description: "Будущее в титановом корпусе.", 
        specs: ["Экран 6.9\"", "A19 Pro", "5x Zoom"], 
        colors: ["#454d5b", "#e3e4e5", "#f7e8d0", "#2d2e32"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/3e7/100500_800_140cd750bba9870f18aada2478b24840a/c6b0ndzv7rqf8u9c456xwvgolvkkdf11.jpg" 
    },
    { 
        id: "i17pro", 
        title: "iPhone 17 Pro", 
        price: 999, 
        description: "Профессиональная мощь.", 
        specs: ["A19 Pro", "6.3\"", "120Hz"], 
        colors: ["#454d5b", "#e3e4e5", "#f7e8d0", "#2d2e32"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/425/100500_800_140cd750bba9870f18aada2478b24840a/63zba8vr1pr1qx83hjr8hq3qd76uj8of.jpg" 
    },
    { 
        id: "i17", 
        title: "iPhone 17", 
        price: 799, 
        description: "Новый стандарт.", 
        specs: ["A19 Bionic", "6.1\"", "48Mp"], 
        colors: ["#31353a", "#f2f3ee", "#e5dbea", "#d0e3ed"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/2f7/100500_800_140cd750bba9870f18aada2478b24840a/d3tf4gy4fvsh1uacmwk9cvfx576r6hfp.jpg" 
    },

    // iPhone 16 Series
    { 
        id: "i16promax", 
        title: "iPhone 16 Pro Max", 
        price: 1099, 
        description: "Apple Intelligence.", 
        specs: ["A18 Pro", "Титановый корпус", "Camera Control"], 
        colors: ["#454545", "#f5f5f0", "#d1c7b7", "#3b3c3e"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/e7a/100500_800_140cd750bba9870f18aada2478b24840a/3fkzizh2j3ecnj83n008g53uk15biuup.jpg" 
    },
    { 
        id: "i16pro", 
        title: "iPhone 16 Pro", 
        price: 999, 
        description: "Мощь в компактном размере.", 
        specs: ["A18 Pro", "4K 120fps"], 
        colors: ["#454545", "#f5f5f0", "#d1c7b7", "#3b3c3e"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/ca9/100500_800_140cd750bba9870f18aada2478b24840a/1um5lfka1r127hpc1c6y2r73q4x2l339.jpg" 
    },
    { 
        id: "i16", 
        title: "iPhone 16", 
        price: 799, 
        description: "Новая эра Apple.", 
        specs: ["A18 Chip", "Action Button"], 
        colors: ["#2d2e32", "#f9f9f9", "#7db6d0", "#d89ec5", "#a9bfa1"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/938/100500_800_140cd750bba9870f18aada2478b24840a/0nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg" 
    },
    { 
        id: "i16plus", 
        title: "iPhone 16 Plus", 
        price: 899, 
        description: "Большой экран, большая батарея.", 
        specs: ["A18", "6.7\""], 
        colors: ["#2d2e32", "#f9f9f9", "#7db6d0", "#d89ec5", "#a9bfa1"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/e54/100500_800_140cd750bba9870f18aada2478b24840a/2ejqmg2ifqb3bmoya38k9u3owbqygrz1.jpg" 
    },

    // iPhone 15 Series
    { 
        id: "i15promax", 
        title: "iPhone 15 Pro Max", 
        price: 899, 
        description: "Первый титановый iPhone.", 
        specs: ["A17 Pro", "USB-C"], 
        colors: ["#454d5b", "#e3e4e5", "#f7e8d0", "#2d2e32"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/81ysro3zyue28kqvn357mugae05nsgvl.jpg" 
    },
    { 
        id: "i15", 
        title: "Apple iPhone 15 Plus", 
        price: 599, 
        description: "Dynamic Island для всех.", 
        specs: ["USB-C", "48Mp"], 
        colors: ["#3c3d3a", "#e1e4e1", "#d4e4f2", "#f2e4ad", "#e6d7d9"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/sbp132akcddo5g2yvmjvofpib40b6c41.jpg" 
    },

    // iPads
    { 
        id: "ipadpro", 
        title: "Apple iPad Pro 13 (2025)", 
        price: 999, 
        description: "Тонкий. Мощный. OLED.", 
        specs: ["M5, Wi-Fi"], 
        colors: ["#2d2e32", "#e3e4e5"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ", "2 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/c31/100500_800_140cd750bba9870f18aada2478b24840a/3a89519konnv8x0gnp2cry8q8mnd6a88.jpg" 
    },
    { 
        id: "ipadair", 
        title: "Apple iPad Air (2025)", 
        price: 599, 
        description: "Мощь для творчества.", 
        specs: ["M3 13\""], 
        colors: ["#e3e4e5", "#d1dbe4", "#e9e5f3", "#d6eade"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/256/100500_800_140cd750bba9870f18aada2478b24840a/forvpclwmz5f57hgg70ch0ieawax9f7u.png" 
    },
    { 
        id: "ipadmini", 
        title: "Apple iPad mini (2024)", 
        price: 499, 
        description: "Мощь в твоем кармане.", 
        specs: ["8,3\"", "A17 Pro"], 
        colors: ["#2d2e32", "#e3e4e5", "#d89ec5", "#7db6d0"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/077/100500_800_140cd750bba9870f18aada2478b24840a/qm5ed6nwk1mlcxmdm9i3xeq5gq56dyyl.jpg" 
    },

    // MacBooks
    { 
        id: "mbp14", 
        title: "Apple MacBook Air 13\"", 
        price: 1599, 
        description: "Для профи.", 
        specs: ["M4, 10C CPU/10C GPU"], 
        colors: ["#2d2e32", "#e3e4e5", "#f7e8d0", "#bfc0c2"],
        storage: ["512 ГБ", "1 ТБ", "2 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg" 
    },
    { 
        id: "m4air13", 
        title: "Apple MacBook Air 13\"", 
        price: 1099, 
        description: "Тонкий и мощный.", 
        specs: ["M4, 10C CPU/10C GPU"], 
        colors: ["#2d2e32", "#e3e4e5", "#f7e8d0", "#bfc0c2"],
        storage: ["16 ГБ / 512 ГБ", "24 ГБ / 1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg" 
    },
    { 
        id: "mbp16", 
        title: "Apple MacBook Pro 14\"", 
        price: 2499, 
        description: "Максимум производительности.", 
        specs: ["M5 10C CPU", "Liquid Retina XDR"], 
        colors: ["#2d2e32", "#bfc0c2"],
        storage: ["24 ГБ / 1 ТБ", "32 ГБ / 2 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/a9e/100500_800_140cd750bba9870f18aada2478b24840a/ehkghuinyu3z0ib89z6j3x1cz2jguk08.jpg" 
    }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
