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
            "128 ГБ": 799,
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
            "256 ГБ": 1099,
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
            "128 ГБ": 999,
            "256 ГБ": 1099,
            "512 ГБ": 1299,
            "1 ТБ": 1599
        },
        simPrices: { "eSIM": 0, "SIM + eSIM": 30, "Dual SIM": 70 }
    },
    { 
        id: "i16", 
        title: "Apple iPhone 16", 
        price: 599, 
        description: "Яркий и производительный.", 
        specs: ["A18 Chip", "6.1\""], 
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
        title: "Apple iPhone 15 Pro Max", 
        price: 899, 
        description: "Первый титановый iPhone с 5х зумом.", 
        specs: ["A17 Pro", "6.7\""], 
        colors: ["#efeff5"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ"],
        sim: ["eSIM", "SIM + eSIM"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/cf6/100500_800_140cd750bba9870f18aada2478b24840a/wvs0w8asdqamtg3mhr6jxl1de8186fs7.jpg",
        images: {
            "#efeff5": "https://static.re-store.ru/upload/resize_cache/iblock/cf6/100500_800_140cd750bba9870f18aada2478b24840a/wvs0w8asdqamtg3mhr6jxl1de8186fs7.jpg",
        },
        storagePrices: { "256 ГБ": 799, "512 ГБ": 899, "1 ТБ": 999 },
        simPrices: { "eSIM": 0, "SIM + eSIM": 20, "Dual SIM": 60 }
    },

    // --- iPADS ---
    { 
        id: "ipadpro", 
        title: "Apple iPad Pro 13 (M5, 2025) WiFi + Cellular", 
        price: 1399, 
        description: "Тонкий. Мощный. OLED-дисплей нового поколения.", 
        specs: ["M5 Chip", "Ultra Retina OLED", "WiFi"], 
        colors: ["#9ca2b0", "#efeff5"],
        storage: ["256 ГБ", "512 ГБ", "1 ТБ", "2 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/c31/100500_800_140cd750bba9870f18aada2478b24840a/3a89519konnv8x0gnp2cry8q8mnd6a88.jpg",
        images: {
            "#9ca2b0": "https://static.re-store.ru/upload/resize_cache/iblock/c31/100500_800_140cd750bba9870f18aada2478b24840a/3a89519konnv8x0gnp2cry8q8mnd6a88.jpg",
            "#efeff5": "https://static.re-store.ru/upload/resize_cache/iblock/8d3/100500_800_140cd750bba9870f18aada2478b24840a/aiebiutl1oj68lvse8a0ia8txxaah05i.jpg"
        },
        storagePrices: {
            "256 ГБ": 1399,
            "512 ГБ": 1499,
            "1 ТБ": 1699,
            "2 ТБ": 1999
        }
    },
    { 
        id: "ipadair", 
        title: "Apple iPad Air (2025) M3 13", 
        price: 799, 
        description: "Больше экрана. Больше возможностей.", 
        specs: ["M3 Chip", "Liquid Retina", "WiFi + Cellular"], 
        colors: ["#5cabff", "#5a636d", "#b450e2", "#e2ddbb"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/69a/100500_800_140cd750bba9870f18aada2478b24840a/5td2b1nfucmf0t628ttpi0i0alv23arv.jpg",
        images: {
            "#5cabff": "https://static.re-store.ru/upload/resize_cache/iblock/69a/100500_800_140cd750bba9870f18aada2478b24840a/5td2b1nfucmf0t628ttpi0i0alv23arv.jpg",
            "#5a636d": "https://static.re-store.ru/upload/resize_cache/iblock/d1c/100500_800_140cd750bba9870f18aada2478b24840a/bfxgoq3swz0txa76bmebbpyn5y21g9cl.jpg",
            "#b450e2": "https://static.re-store.ru/upload/resize_cache/iblock/07f/100500_800_140cd750bba9870f18aada2478b24840a/1k15b0ud4vihafcx1o6ifiz8qfi7sxy5.jpg",
            "#e2ddbb": "https://static.re-store.ru/upload/resize_cache/iblock/86d/100500_800_140cd750bba9870f18aada2478b24840a/b58buipwqpsokmodxkk754uujbp7esnv.jpg"
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
        title: "Apple iPad mini (2024)", 
        price: 499, 
        description: "Огромная мощь в миниатюрном корпусе.", 
        specs: ["A17 Pro", "8.3\"", "WiFi + Cellular"], 
        colors: ["#5cabff", "#5a636d", "#e2ddbb"],
        storage: ["128 ГБ", "256 ГБ", "512 ГБ"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/7c6/100500_800_140cd750bba9870f18aada2478b24840a/k42tnxufuvqp4ejnaxikhzbp322ld1aw.jpg",
        images: {
            "#5cabff": "https://static.re-store.ru/upload/resize_cache/iblock/7c6/100500_800_140cd750bba9870f18aada2478b24840a/k42tnxufuvqp4ejnaxikhzbp322ld1aw.jpg",
            "#5a636d": "https://static.re-store.ru/upload/resize_cache/iblock/077/100500_800_140cd750bba9870f18aada2478b24840a/qm5ed6nwk1mlcxmdm9i3xeq5gq56dyyl.jpg",
            "#e2ddbb": "https://static.re-store.ru/upload/resize_cache/iblock/65a/100500_800_140cd750bba9870f18aada2478b24840a/jw70c62k7itfk5jvhsr62sb7ddzuoqit.jpg"
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
        title: "Apple MacBook Pro 14\"", 
        price: 1599, 
        description: "Профессиональный инструмент на чипе M5.", 
        specs: ["M5 Chip", "10-core CPU", "16GB Unified RAM"], 
        colors: ["#141414", "#9ca2b0"],
        storage: ["SSD 512Gb ОЗУ 16Gb", "SSD 1ТБ ОЗУ 24Gb", "SSD 2ТБ ОЗУ 48Gb"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/712/100500_800_140cd750bba9870f18aada2478b24840a/2d24borrhwi0dmwizcuilv1515g5asst.jpg",
        images: {
            "#141414": "https://static.re-store.ru/upload/resize_cache/iblock/712/100500_800_140cd750bba9870f18aada2478b24840a/2d24borrhwi0dmwizcuilv1515g5asst.jpg",
            "#9ca2b0": "https://static.re-store.ru/upload/resize_cache/iblock/f90/100500_800_140cd750bba9870f18aada2478b24840a/vli1ibd549jxssugnie36iwfwfdd1h91.jpg"
        },
        storagePrices: {
            "SSD 512Gb ОЗУ 16Gb": 2399,
            "SSD 1ТБ ОЗУ 24Gb": 2599,
            "SSD 2ТБ ОЗУ 48Gb": 3299
        }
    },
    { 
        id: "mbp16", 
        title: "Apple MacBook Pro 16\"", 
        price: 2499, 
        description: "Максимум экрана и производительности.", 
        specs: ["M4 Max", "Liquid Retina XDR", "96W Charge"], 
        colors: ["#141414", "#9ca2b0"],
        storage: ["SSD 1ТБ ОЗУ 36Gb", "SSD 2ТБ ОЗУ 64Gb", "SSD 8ТБ ОЗУ 128Gb"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg",
        images: {
            "#141414": "https://static.re-store.ru/upload/iblock/93a/cedafw22o08vgt62u0wy4xtrkaubxh0j.png",
            "#9ca2b0": "https://static.re-store.ru/upload/iblock/28f/zwz3kl0dslap8ttqbxinh7uzt4il7a6d.png"
        },
        storagePrices: {
            "SSD 1ТБ ОЗУ 36Gb": 2499,
            "SSD 2ТБ ОЗУ 64Gb": 2899,
            "SSD 8ТБ ОЗУ 128Gb": 3699
        }
    },
    { 
        id: "mbair", 
        title: "Apple MacBook Air 13 (M4)", 
        price: 1099, 
        description: "Тонкий, легкий, бесшумный.", 
        specs: ["M4 Chip", "18 часов работы", "Liquid Retina"], 
        colors: ["#9ca2b0", "#141414", "#e2ddbb"],
        storage: ["SSD 256Gb ОЗУ 16Gb", "SSD 512Gb ОЗУ 24Gb", "SSD 1ТБ ОЗУ 32Gb"],
        image: "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg",
        images: {
            "#9ca2b0": "https://static.re-store.ru/upload/resize_cache/iblock/f63/100500_800_140cd750bba9870f18aada2478b24840a/hb9n4k5zgl3gjbkvo0yvd7liukcdtkvr.jpg",
            "#141414": "https://static.re-store.ru/upload/resize_cache/iblock/130/100500_800_140cd750bba9870f18aada2478b24840a/qyc9xmj0wiafd5itij7qw8k11vqf1e92.jpg",
            "#e2ddbb": "https://static.re-store.ru/upload/resize_cache/iblock/bbe/100500_800_140cd750bba9870f18aada2478b24840a/3finphiume3tp0dwibjhte78fi1tyeie.jpg"
        },
        storagePrices: {
            "SSD 256Gb ОЗУ 16Gb": 1399,
            "SSD 512Gb ОЗУ 24Gb": 2099,
            "SSD 1ТБ ОЗУ 32Gb": 3199
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
