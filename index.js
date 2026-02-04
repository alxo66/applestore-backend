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
        image: "https://static.re-store.ru/upload/resize_cache/iblock/3e7/100500_800_140cd750bba9870f18aada2478b24840a/c6b0ndzv7rqf8u9c456xwvgolvkkdf11.jpg",
        images: {
            "#454d5b": "https://static.re-store.ru/upload/resize_cache/iblock/3e7/100500_800_140cd750bba9870f18aada2478b24840a/c6b0ndzv7rqf8u9c456xwvgolvkkdf11.jpg",
            "#e3e4e5": "https://static.re-store.ru/upload/resize_cache/iblock/3e7/100500_800_140cd750bba9870f18aada2478b24840a/801v2s73b5qclisg1f9b37v4983x46j1.jpg",
            "#f7e8d0": "https://static.re-store.ru/upload/resize_cache/iblock/3e7/100500_800_140cd750bba9870f18aada2478b24840a/39oiaf4kpg60b9432f8y1v2l6m7u3f9z.jpg",
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/3e7/100500_800_140cd750bba9870f18aada2478b24840a/73a987654321fedcba0987654321fedc.jpg"
        },
        storagePrices: {
            "256 ГБ": 1199,
            "512 ГБ": 1399,
            "1 ТБ": 1599
        }
    },
    { 
        id: "i17pro", 
        title: "iPhone 17 Pro", 
        price: 999, 
        description: "Профессиональная мощь.", 
        specs: ["A19 Pro", "6.3\"", "120Hz"], 
        colors: ["#454d5b", "#e3e4e5", "#f7e8d0", "#2d2e32"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/425/100500_800_140cd750bba9870f18aada2478b24840a/63zba8vr1pr1qx83hjr8hq3qd76uj8of.jpg",
        images: {
            "#454d5b": "https://static.re-store.ru/upload/resize_cache/iblock/425/100500_800_140cd750bba9870f18aada2478b24840a/63zba8vr1pr1qx83hjr8hq3qd76uj8of.jpg",
            "#e3e4e5": "https://static.re-store.ru/upload/resize_cache/iblock/425/100500_800_140cd750bba9870f18aada2478b24840a/73vba8vr1pr1qx83hjr8hq3qd76uj8of.jpg",
            "#f7e8d0": "https://static.re-store.ru/upload/resize_cache/iblock/425/100500_800_140cd750bba9870f18aada2478b24840a/83vba8vr1pr1qx83hjr8hq3qd76uj8of.jpg",
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/425/100500_800_140cd750bba9870f18aada2478b24840a/93vba8vr1pr1qx83hjr8hq3qd76uj8of.jpg"
        },
        storagePrices: {
            "128 ГБ": 999,
            "256 ГБ": 1099,
            "512 ГБ": 1299,
            "1 ТБ": 1499
        }
    },
    { 
        id: "i17", 
        title: "iPhone 17", 
        price: 799, 
        description: "Новый стандарт.", 
        specs: ["A19 Bionic", "6.1\"", "48Mp"], 
        colors: ["#31353a", "#f2f3ee", "#e5dbea", "#d0e3ed"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/2f7/100500_800_140cd750bba9870f18aada2478b24840a/d3tf4gy4fvsh1uacmwk9cvfx576r6hfp.jpg",
        images: {
            "#31353a": "https://static.re-store.ru/upload/resize_cache/iblock/2f7/100500_800_140cd750bba9870f18aada2478b24840a/d3tf4gy4fvsh1uacmwk9cvfx576r6hfp.jpg",
            "#f2f3ee": "https://static.re-store.ru/upload/resize_cache/iblock/2f7/100500_800_140cd750bba9870f18aada2478b24840a/e3tf4gy4fvsh1uacmwk9cvfx576r6hfp.jpg",
            "#e5dbea": "https://static.re-store.ru/upload/resize_cache/iblock/2f7/100500_800_140cd750bba9870f18aada2478b24840a/f3tf4gy4fvsh1uacmwk9cvfx576r6hfp.jpg",
            "#d0e3ed": "https://static.re-store.ru/upload/resize_cache/iblock/2f7/100500_800_140cd750bba9870f18aada2478b24840a/g3tf4gy4fvsh1uacmwk9cvfx576r6hfp.jpg"
        },
        storagePrices: {
            "128 ГБ": 799,
            "256 ГБ": 899,
            "512 ГБ": 1099
        }
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
        image: "https://static.re-store.ru/upload/resize_cache/iblock/e7a/100500_800_140cd750bba9870f18aada2478b24840a/3fkzizh2j3ecnj83n008g53uk15biuup.jpg",
        images: {
            "#454545": "https://static.re-store.ru/upload/resize_cache/iblock/e7a/100500_800_140cd750bba9870f18aada2478b24840a/3fkzizh2j3ecnj83n008g53uk15biuup.jpg",
            "#f5f5f0": "https://static.re-store.ru/upload/resize_cache/iblock/e7a/100500_800_140cd750bba9870f18aada2478b24840a/1fkzizh2j3ecnj83n008g53uk15biuup.jpg",
            "#d1c7b7": "https://static.re-store.ru/upload/resize_cache/iblock/e7a/100500_800_140cd750bba9870f18aada2478b24840a/2fkzizh2j3ecnj83n008g53uk15biuup.jpg",
            "#3b3c3e": "https://static.re-store.ru/upload/resize_cache/iblock/e7a/100500_800_140cd750bba9870f18aada2478b24840a/4fkzizh2j3ecnj83n008g53uk15biuup.jpg"
        },
        storagePrices: {
            "256 ГБ": 1099,
            "512 ГБ": 1299,
            "1 ТБ": 1499
        }
    },
    { 
        id: "i16pro", 
        title: "iPhone 16 Pro", 
        price: 999, 
        description: "Мощь в компактном размере.", 
        specs: ["A18 Pro", "4K 120fps"], 
        colors: ["#454545", "#f5f5f0", "#d1c7b7", "#3b3c3e"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/ca9/100500_800_140cd750bba9870f18aada2478b24840a/1um5lfka1r127hpc1c6y2r73q4x2l339.jpg",
        images: {
            "#454545": "https://static.re-store.ru/upload/resize_cache/iblock/ca9/100500_800_140cd750bba9870f18aada2478b24840a/1um5lfka1r127hpc1c6y2r73q4x2l339.jpg",
            "#f5f5f0": "https://static.re-store.ru/upload/resize_cache/iblock/ca9/100500_800_140cd750bba9870f18aada2478b24840a/2um5lfka1r127hpc1c6y2r73q4x2l339.jpg",
            "#d1c7b7": "https://static.re-store.ru/upload/resize_cache/iblock/ca9/100500_800_140cd750bba9870f18aada2478b24840a/3um5lfka1r127hpc1c6y2r73q4x2l339.jpg",
            "#3b3c3e": "https://static.re-store.ru/upload/resize_cache/iblock/ca9/100500_800_140cd750bba9870f18aada2478b24840a/4um5lfka1r127hpc1c6y2r73q4x2l339.jpg"
        },
        storagePrices: {
            "128 ГБ": 999,
            "256 ГБ": 1099,
            "512 ГБ": 1299,
            "1 ТБ": 1499
        }
    },
    { 
        id: "i16", 
        title: "iPhone 16", 
        price: 799, 
        description: "Новая эра Apple.", 
        specs: ["A18 Chip", "Action Button"], 
        colors: ["#2d2e32", "#f9f9f9", "#7db6d0", "#d89ec5", "#a9bfa1"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/938/100500_800_140cd750bba9870f18aada2478b24840a/0nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg",
        images: {
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/938/100500_800_140cd750bba9870f18aada2478b24840a/0nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg",
            "#f9f9f9": "https://static.re-store.ru/upload/resize_cache/iblock/938/100500_800_140cd750bba9870f18aada2478b24840a/1nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg",
            "#7db6d0": "https://static.re-store.ru/upload/resize_cache/iblock/938/100500_800_140cd750bba9870f18aada2478b24840a/2nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg",
            "#d89ec5": "https://static.re-store.ru/upload/resize_cache/iblock/938/100500_800_140cd750bba9870f18aada2478b24840a/3nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg",
            "#a9bfa1": "https://static.re-store.ru/upload/resize_cache/iblock/938/100500_800_140cd750bba9870f18aada2478b24840a/4nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg"
        },
        storagePrices: {
            "128 ГБ": 799,
            "256 ГБ": 899,
            "512 ГБ": 1099
        }
    },
    { 
        id: "i16plus", 
        title: "iPhone 16 Plus", 
        price: 899, 
        description: "Большой экран, большая батарея.", 
        specs: ["A18", "6.7\""], 
        colors: ["#2d2e32", "#f9f9f9", "#7db6d0", "#d89ec5", "#a9bfa1"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/e54/100500_800_140cd750bba9870f18aada2478b24840a/2ejqmg2ifqb3bmoya38k9u3owbqygrz1.jpg",
        images: {
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/e54/100500_800_140cd750bba9870f18aada2478b24840a/2ejqmg2ifqb3bmoya38k9u3owbqygrz1.jpg",
            "#f9f9f9": "https://static.re-store.ru/upload/resize_cache/iblock/e54/100500_800_140cd750bba9870f18aada2478b24840a/1ejqmg2ifqb3bmoya38k9u3owbqygrz1.jpg",
            "#7db6d0": "https://static.re-store.ru/upload/resize_cache/iblock/e54/100500_800_140cd750bba9870f18aada2478b24840a/3ejqmg2ifqb3bmoya38k9u3owbqygrz1.jpg",
            "#d89ec5": "https://static.re-store.ru/upload/resize_cache/iblock/e54/100500_800_140cd750bba9870f18aada2478b24840a/4ejqmg2ifqb3bmoya38k9u3owbqygrz1.jpg",
            "#a9bfa1": "https://static.re-store.ru/upload/resize_cache/iblock/e54/100500_800_140cd750bba9870f18aada2478b24840a/5ejqmg2ifqb3bmoya38k9u3owbqygrz1.jpg"
        },
        storagePrices: {
            "128 ГБ": 899,
            "256 ГБ": 999,
            "512 ГБ": 1199
        }
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
        image: "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/81ysro3zyue28kqvn357mugae05nsgvl.jpg",
        images: {
            "#454d5b": "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/81ysro3zyue28kqvn357mugae05nsgvl.jpg",
            "#e3e4e5": "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/71ysro3zyue28kqvn357mugae05nsgvl.jpg",
            "#f7e8d0": "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/61ysro3zyue28kqvn357mugae05nsgvl.jpg",
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/51ysro3zyue28kqvn357mugae05nsgvl.jpg"
        },
        storagePrices: {
            "256 ГБ": 899,
            "512 ГБ": 1099,
            "1 ТБ": 1299
        }
    },
    { 
        id: "i15", 
        title: "Apple iPhone 15 Plus", 
        price: 599, 
        description: "Dynamic Island для всех.", 
        specs: ["USB-C", "48Mp"], 
        colors: ["#3c3d3a", "#e1e4e1", "#d4e4f2", "#f2e4ad", "#e6d7d9"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/sbp132akcddo5g2yvmjvofpib40b6c41.jpg",
        images: {
            "#3c3d3a": "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/sbp132akcddo5g2yvmjvofpib40b6c41.jpg",
            "#e1e4e1": "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/abp132akcddo5g2yvmjvofpib40b6c41.jpg",
            "#d4e4f2": "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/bbp132akcddo5g2yvmjvofpib40b6c41.jpg",
            "#f2e4ad": "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/cbp132akcddo5g2yvmjvofpib40b6c41.jpg",
            "#e6d7d9": "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/dbp132akcddo5g2yvmjvofpib40b6c41.jpg"
        },
        storagePrices: {
            "128 ГБ": 599,
            "256 ГБ": 699,
            "512 ГБ": 899
        }
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
        image: "https://static.re-store.ru/upload/resize_cache/iblock/c31/100500_800_140cd750bba9870f18aada2478b24840a/3a89519konnv8x0gnp2cry8q8mnd6a88.jpg",
        images: {
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/c31/100500_800_140cd750bba9870f18aada2478b24840a/3a89519konnv8x0gnp2cry8q8mnd6a88.jpg",
            "#e3e4e5": "https://static.re-store.ru/upload/resize_cache/iblock/c31/100500_800_140cd750bba9870f18aada2478b24840a/4a89519konnv8x0gnp2cry8q8mnd6a88.jpg"
        },
        storagePrices: {
            "256 ГБ": 999,
            "512 ГБ": 1199,
            "1 ТБ": 1599,
            "2 ТБ": 1999
        }
    },

    // MacBooks
    { 
        id: "mbp14", 
        title: "Apple MacBook Pro 14\"", 
        price: 1599, 
        description: "Для профи.", 
        specs: ["M4, 10C CPU/10C GPU"], 
        colors: ["#2d2e32", "#e3e4e5", "#f7e8d0", "#bfc0c2"],
        storage: ["512 ГБ", "1 ТБ", "2 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg",
        images: {
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg",
            "#bfc0c2": "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/ayc9xmj0wiafd5itij7qw8k11vqf1e92.jpg"
            // Добавь другие цвета если есть ссылки
        },
        storagePrices: {
            "512 ГБ": 1599,
            "1 ТБ": 1799,
            "2 ТБ": 2199
        }
    }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

// Роут для заказов (нужен для api.js)
app.post('/api/order', (req, res) => {
    const { productId, selectedColor, selectedStorage, price } = req.body;
    console.log(`Новый заказ: ${productId}, Цвет: ${selectedColor}, Память: ${selectedStorage}, Цена: ${price}`);
    res.json({ success: true, message: "Заказ оформлен" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
