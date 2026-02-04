const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const products = [
    // --- iPHONE 17 SERIES ---
    { 
        id: "i17promax", 
        title: "Apple iPhone 17 Pro Max", 
        price: 1300, 
        description: "Будущее в титановом корпусе. Самый мощный чип A19 Pro.", 
        specs: ["Экран 6.9\"", "A19 Pro"], 
        colors: ["#9ca2b0", "#ff6600", "#000138"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
        sim: ["eSIM", "SIM + eSIM"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/3e7/100500_800_140cd750bba9870f18aada2478b24840a/c6b0ndzv7rqf8u9c456xwvgolvkkdf11.jpg",
        images: {
            "#9ca2b0": "https://static.re-store.ru/upload/resize_cache/iblock/06a/100500_800_140cd750bba9870f18aada2478b24840a/rtj0gu24fye1uesfrlwqxtvctm90v8al.jpg",
            "#ff6600": "https://static.re-store.ru/upload/resize_cache/iblock/648/100500_800_140cd750bba9870f18aada2478b24840a/ua63t9h5n5nuasie0sdg772qr4y5xdez.jpg",
            "#000138": "https://static.re-store.ru/upload/resize_cache/iblock/6eb/100500_800_140cd750bba9870f18aada2478b24840a/6lc528gxbxh4duxcc0l9al1ih6vfv58m.jpg"
        },
        storagePrices: {
            "256 ГБ": 1299,
            "512 ГБ": 1899,
            "1 ТБ": 2399
        },
        simPrices: {
            "eSIM": 0,
            "SIM + eSIM": 49,
            "Dual SIM": 99
        }
    },
    { 
        id: "i17pro", 
        title: "Apple iPhone 17 Pro", 
        price: 999, 
        description: "Профессиональная мощь в новом цвете.", 
        specs: ["A19 Pro", "6.3\""], 
        colors: ["#9ca2b0", "#ff6600", "#000138"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
        sim: ["eSIM", "SIM + eSIM"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/425/100500_800_140cd750bba9870f18aada2478b24840a/63zba8vr1pr1qx83hjr8hq3qd76uj8of.jpg",
        images: {
            "#9ca2b0": "https://static.re-store.ru/upload/resize_cache/iblock/dc4/100500_800_140cd750bba9870f18aada2478b24840a/3tboc1aze44w24u1v2aawcfqbtj80nyr.jpg",
            "#ff6600": "https://static.re-store.ru/upload/resize_cache/iblock/425/100500_800_140cd750bba9870f18aada2478b24840a/63zba8vr1pr1qx83hjr8hq3qd76uj8of.jpg",
            "#000138": "https://static.re-store.ru/upload/resize_cache/iblock/e54/100500_800_140cd750bba9870f18aada2478b24840a/idywry6hey7xlu9ms9u53a1qalz11uid.jpg",
        },
        storagePrices: {
            "256 ГБ": 1199,
            "512 ГБ": 1399,
            "1 ТБ": 1599
        },
        simPrices: {
            "eSIM": 0,
            "SIM + eSIM": 40,
            "Dual SIM": 90
        }
    },
    { 
        id: "i17", 
        title: "Apple iPhone 17", 
        price: 799, 
        description: "Тонкий, легкий, невероятный.", 
        specs: ["A19 Bionic", "6.3\""], 
        colors: ["#efeff5", "#6a95ec", "#67c595", "#141414", "#9287e8"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        sim: ["eSIM", "SIM + eSIM"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/2f7/100500_800_140cd750bba9870f18aada2478b24840a/d3tf4gy4fvsh1uacmwk9cvfx576r6hfp.jpg",
        images: {
            "#efeff5": "https://static.re-store.ru/upload/resize_cache/iblock/5ea/100500_800_140cd750bba9870f18aada2478b24840a/0mef8vqb1fwneyvkybz1nf0xdwvd388i.jpg",
            "#6a95ec": "https://static.re-store.ru/upload/resize_cache/iblock/79f/100500_800_140cd750bba9870f18aada2478b24840a/e5kei4evzrg2q6sw19zjmkdu8ekr836k.jpg",
            "#67c595": "https://static.re-store.ru/upload/resize_cache/iblock/449/100500_800_140cd750bba9870f18aada2478b24840a/3ez42diuwvu09uxte2zkm7g251mhywxx.jpg",
            "#141414": "https://static.re-store.ru/upload/resize_cache/iblock/2f7/100500_800_140cd750bba9870f18aada2478b24840a/d3tf4gy4fvsh1uacmwk9cvfx576r6hfp.jpg",
            "#9287e8": "https://static.re-store.ru/upload/resize_cache/iblock/fbe/100500_800_140cd750bba9870f18aada2478b24840a/xiypmqi1pm3adi8nvzotf9sht7q8iige.jpg"
        },
        storagePrices: {
            "256 ГБ": 899,
            "512 ГБ": 1099
        },
        simPrices: {
            "eSIM": 0,
            "SIM + eSIM": 30
        }
    },

    // --- iPHONE 16 SERIES ---
    { 
        id: "i16promax", 
        title: "Apple iPhone 16 Pro Max", 
        price: 1099, 
        description: "Apple Intelligence и титан.", 
        specs: ["A18 Pro", "6.9\""], 
        colors: ["#141414", "#efeff5", "#9ca2b0", "#d5af6c"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
        sim: ["eSIM", "SIM + eSIM"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/e7a/100500_800_140cd750bba9870f18aada2478b24840a/3fkzizh2j3ecnj83n008g53uk15biuup.jpg",
        images: {
            "#141414": "https://static.re-store.ru/upload/resize_cache/iblock/e7a/100500_800_140cd750bba9870f18aada2478b24840a/3fkzizh2j3ecnj83n008g53uk15biuup.jpg",
            "#efeff5": "https://static.re-store.ru/upload/resize_cache/iblock/b71/100500_800_140cd750bba9870f18aada2478b24840a/vk10qsjc12kkihlu83w6vmhceot7okpv.jpg",
            "#9ca2b0": "https://static.re-store.ru/upload/resize_cache/iblock/a46/100500_800_140cd750bba9870f18aada2478b24840a/l3yvlidarp4nq24fg2qe86lv6wkakjsb.jpg",
            "#d5af6c": "https://static.re-store.ru/upload/resize_cache/iblock/0bc/100500_800_140cd750bba9870f18aada2478b24840a/0eybzk3ijxb0dr3ox8gxbss0e1s4jmae.jpg"
        },
        storagePrices: {
            "256 ГБ": 999,
            "512 ГБ": 1199,
            "1 ТБ": 1399
        },
        simPrices: { "eSIM": 0, "SIM + eSIM": 40, "Dual SIM": 80 }
    },
    { 
        id: "i16pro", 
        title: "Apple iPhone 16 Pro", 
        price: 999, 
        description: "Мощь в компактном размере.", 
        specs: ["A18 Pro", "6.3\""], 
        colors: ["#141414", "#efeff5", "#9ca2b0", "#d5af6c"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ"],
        sim: ["eSIM", "SIM + eSIM"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/ca9/100500_800_140cd750bba9870f18aada2478b24840a/1um5lfka1r127hpc1c6y2r73q4x2l339.jpg",
        images: {
            "#141414": "https://static.re-store.ru/upload/resize_cache/iblock/ca9/100500_800_140cd750bba9870f18aada2478b24840a/1um5lfka1r127hpc1c6y2r73q4x2l339.jpg",
            "#efeff5": "https://static.re-store.ru/upload/resize_cache/iblock/b40/100500_800_140cd750bba9870f18aada2478b24840a/kmr65n37eshklj1s8ptoarw9399wonau.jpg",
            "#9ca2b0": "https://static.re-store.ru/upload/resize_cache/iblock/01f/100500_800_140cd750bba9870f18aada2478b24840a/bprnyy120p5zof1uybl4yws5uo2qma34.jpg",
            "#d5af6c": "https://static.re-store.ru/upload/resize_cache/iblock/1f5/100500_800_140cd750bba9870f18aada2478b24840a/ymntx2qy15nj7x154c10qntwsbghifhb.jpg"
        },
        storagePrices: {
            "128 ГБ": 899,
            "256 ГБ": 999,
            "512 ГБ": 1199,
            "1 ТБ": 1599
        },
        simPrices: { "eSIM": 0, "SIM + eSIM": 30, "Dual SIM": 70 }
    },
    { 
        id: "i16", 
        title: "Apple iPhone 16", 
        price: 799, 
        description: "Яркий и производительный.", 
        specs: ["A18 Chip", "6.3\""], 
        colors: ["#efeff5", "#6a95ec", "#67c595", "#141414", "#e40bf4"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        sim: ["eSIM", "SIM + eSIM"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/938/100500_800_140cd750bba9870f18aada2478b24840a/0nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg",
        images: {
            "#efeff5": "https://static.re-store.ru/upload/resize_cache/iblock/240/100500_800_140cd750bba9870f18aada2478b24840a/0j9ufhxiqq1pjv9hhkqelsnhx1jkksrs.jpg",
            "#6a95ec": "https://static.re-store.ru/upload/resize_cache/iblock/1b4/100500_800_140cd750bba9870f18aada2478b24840a/lpc9988ub3v7o223tywklsuql80j3rwf.jpg",
            "#67c595": "https://static.re-store.ru/upload/resize_cache/iblock/1be/100500_800_140cd750bba9870f18aada2478b24840a/r2bbblm6qjyvndaqdwud0kltfobvrt77.jpg",
            "#141414": "https://static.re-store.ru/upload/resize_cache/iblock/938/100500_800_140cd750bba9870f18aada2478b24840a/0nezbz8sc7xr6vzyjmw7tjzx9al17n95.jpg",
            "#e40bf4": "https://static.re-store.ru/upload/resize_cache/iblock/651/100500_800_140cd750bba9870f18aada2478b24840a/yx1cu4by682ipt0if9irxfkhascp5y5t.jpg"
        },
        storagePrices: { "128 ГБ": 599, "256 ГБ": 699, "512 ГБ": 899 },
        simPrices: { "eSIM": 0, "SIM + eSIM": 30 }
    },

    // --- iPHONE 15 SERIES ---
    { 
        id: "i15promax", 
        title: "iPhone 15 Pro Max", 
        price: 899, 
        description: "Первый титановый iPhone с 5х зумом.", 
        specs: ["A17 Pro", "USB-C 3.0", "Titanium"], 
        colors: ["#454d5b", "#e3e4e5", "#f7e8d0", "#2d2e32"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
        sim: ["eSIM", "SIM + eSIM"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/81ysro3zyue28kqvn357mugae05nsgvl.jpg",
        images: {
            "#454d5b": "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/81ysro3zyue28kqvn357mugae05nsgvl.jpg",
            "#e3e4e5": "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/71ysro3zyue28kqvn357mugae05nsgvl.jpg",
            "#f7e8d0": "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/61ysro3zyue28kqvn357mugae05nsgvl.jpg",
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/dc0/100500_800_140cd750bba9870f18aada2478b24840a/51ysro3zyue28kqvn357mugae05nsgvl.jpg"
        },
        storagePrices: { "256 ГБ": 899, "512 ГБ": 1099, "1 ТБ": 1299 },
        simPrices: { "eSIM": 0, "SIM + eSIM": 20, "Dual SIM": 60 }
    },
    { 
        id: "i15", 
        title: "iPhone 15 Plus", 
        price: 599, 
        description: "Dynamic Island теперь для всех.", 
        specs: ["USB-C", "48Mp Camera", "A16 Bionic"], 
        colors: ["#3c3d3a", "#e1e4e1", "#d4e4f2", "#f2e4ad", "#e6d7d9"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        sim: ["eSIM", "SIM + eSIM"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/sbp132akcddo5g2yvmjvofpib40b6c41.jpg",
        images: {
            "#3c3d3a": "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/sbp132akcddo5g2yvmjvofpib40b6c41.jpg",
            "#e1e4e1": "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/abp132akcddo5g2yvmjvofpib40b6c41.jpg",
            "#d4e4f2": "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/bbp132akcddo5g2yvmjvofpib40b6c41.jpg",
            "#f2e4ad": "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/cbp132akcddo5g2yvmjvofpib40b6c41.jpg",
            "#e6d7d9": "https://static.re-store.ru/upload/resize_cache/iblock/b26/100500_800_140cd750bba9870f18aada2478b24840a/dbp132akcddo5g2yvmjvofpib40b6c41.jpg"
        },
        storagePrices: { "128 ГБ": 599, "256 ГБ": 699, "512 ГБ": 899 },
        simPrices: { "eSIM": 0, "SIM + eSIM": 20 }
    },

    // --- iPADS ---
    { 
        id: "ipadpro", 
        title: "iPad Pro 13 (2025)", 
        price: 1299, 
        description: "Тонкий. Мощный. OLED-дисплей нового поколения.", 
        specs: ["M5 Chip", "Ultra Retina OLED", "Wi-Fi"], 
        colors: ["#2d2e32", "#e3e4e5"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ", "2 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/c31/100500_800_140cd750bba9870f18aada2478b24840a/3a89519konnv8x0gnp2cry8q8mnd6a88.jpg",
        images: {
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/c31/100500_800_140cd750bba9870f18aada2478b24840a/3a89519konnv8x0gnp2cry8q8mnd6a88.jpg",
            "#e3e4e5": "https://static.re-store.ru/upload/resize_cache/iblock/c31/100500_800_140cd750bba9870f18aada2478b24840a/4a89519konnv8x0gnp2cry8q8mnd6a88.jpg"
        },
        storagePrices: {
            "256 ГБ": 1299,
            "512 ГБ": 1499,
            "1 ТБ": 1899,
            "2 ТБ": 2299
        }
    },
    { 
        id: "ipadair", 
        title: "iPad Air 13", 
        price: 799, 
        description: "Больше экрана. Больше возможностей.", 
        specs: ["M2 Chip", "Liquid Retina", "Touch ID"], 
        colors: ["#3b3c3e", "#e3e4e5", "#d1c7b7", "#7db6d0"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/179/100500_800_140cd750bba9870f18aada2478b24840a/7ayp8sh0n758j8875znd1e6w6c4p2h6n.jpg",
        images: {
            "#3b3c3e": "https://static.re-store.ru/upload/resize_cache/iblock/179/100500_800_140cd750bba9870f18aada2478b24840a/7ayp8sh0n758j8875znd1e6w6c4p2h6n.jpg",
            "#e3e4e5": "https://static.re-store.ru/upload/resize_cache/iblock/179/100500_800_140cd750bba9870f18aada2478b24840a/8ayp8sh0n758j8875znd1e6w6c4p2h6n.jpg"
        },
        storagePrices: {
            "128 ГБ": 799,
            "256 ГБ": 899,
            "512 ГБ": 1099,
            "1 ТБ": 1299
        }
    },
    { 
        id: "ipadmini", 
        title: "iPad mini", 
        price: 499, 
        description: "Огромная мощь в миниатюрном корпусе.", 
        specs: ["A17 Pro", "8.3\"", "Apple Pencil Pro Support"], 
        colors: ["#3b3c3e", "#e3e4e5", "#d89ec5", "#a9bfa1"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/9da/100500_800_140cd750bba9870f18aada2478b24840a/y1h9l42nry1v93765znd1e6w6c4p2h6n.jpg",
        images: {
            "#3b3c3e": "https://static.re-store.ru/upload/resize_cache/iblock/9da/100500_800_140cd750bba9870f18aada2478b24840a/y1h9l42nry1v93765znd1e6w6c4p2h6n.jpg"
        },
        storagePrices: {
            "128 ГБ": 499,
            "256 ГБ": 599,
            "512 ГБ": 799
        }
    },

    // --- MacBOOKS ---
    { 
        id: "mbp14", 
        title: "MacBook Pro 14\"", 
        price: 1599, 
        description: "Профессиональный инструмент на чипе M4.", 
        specs: ["M4 Chip", "10-core CPU", "16GB Unified RAM"], 
        colors: ["#2d2e32", "#bfc0c2"],
        storage: ["512 ГБ", "1 ТБ", "2 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg",
        images: {
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg",
            "#bfc0c2": "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/ayc9xmj0wiafd5itij7qw8k11vqf1e92.jpg"
        },
        storagePrices: {
            "512 ГБ": 1599,
            "1 ТБ": 1799,
            "2 ТБ": 2199
        }
    },
    { 
        id: "mbp16", 
        title: "MacBook Pro 16\"", 
        price: 2499, 
        description: "Максимум экрана и производительности.", 
        specs: ["M4 Max", "Liquid Retina XDR", "96W Charge"], 
        colors: ["#2d2e32", "#bfc0c2"],
        storage: ["1 ТБ", "2 ТБ", "4 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg",
        images: {
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg"
        },
        storagePrices: {
            "1 ТБ": 2499,
            "2 ТБ": 2899,
            "4 ТБ": 3699
        }
    },
    { 
        id: "mbair", 
        title: "MacBook Air 13 (M3)", 
        price: 1099, 
        description: "Тонкий, легкий, бесшумный.", 
        specs: ["M3 Chip", "18 часов работы", "Liquid Retina"], 
        colors: ["#2d2e32", "#e3e4e5", "#d1c7b7", "#3b3c3e"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/785/100500_800_140cd750bba9870f18aada2478b24840a/6vdy9sh0n758j8875znd1e6w6c4p2h6n.jpg",
        images: {
            "#2d2e32": "https://static.re-store.ru/upload/resize_cache/iblock/785/100500_800_140cd750bba9870f18aada2478b24840a/6vdy9sh0n758j8875znd1e6w6c4p2h6n.jpg"
        },
        storagePrices: {
            "256 ГБ": 1099,
            "512 ГБ": 1299,
            "1 ТБ": 1499
        }
    }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/order', (req, res) => {
    const { productId, selectedOptions, price } = req.body;
    console.log(`--- НОВЫЙ ЗАКАЗ ---`);
    console.log(`Товар: ${productId}`);
    console.log(`Опции:`, selectedOptions);
    console.log(`Цена: ${price} USDT`);
    console.log(`-------------------`);
    res.json({ success: true, message: "Заказ оформлен" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
