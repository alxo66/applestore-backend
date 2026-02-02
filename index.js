const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 1. Сначала база данных в памяти
const users = {}; 

// 2. Затем Middleware (должен быть объявлен ДО того, как его используют в роутах)
const authMiddleware = (req, res, next) => {
    const userId = req.headers["x-user-id"];
    if (!userId) return res.status(401).json({ error: "NO_USER" });
    if (!users[userId]) {
        users[userId] = { balance: 0, deposits: [], orders: [] };
    }
    req.user = users[userId];
    req.userId = userId;
    next();
};

// 3. Импорт сервисов и роутов
const telegram = require("./services/telegram.js");
const rates = require("./services/rates.js");
const depositRoute = require("./routes/deposit.js");

// 4. Список товаров
const products = [
    // --- iPHONE 17 SERIES (Future) ---
    { id: "i17promax", title: "iPhone 17 Pro Max", price: 1199, description: "Самый большой экран и титановый корпус будущего.", specs: ["Экран 6.9\"", "A19 Pro", "5x Optical Zoom"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16_pro__9ba8659sh6u_large.jpg" },
    
    // --- iPHONE 16 SERIES ---
    { id: "i16promax", title: "iPhone 16 Pro Max", price: 1099, description: "Интеллект Apple Intelligence и кнопка управления камерой.", specs: ["A18 Pro", "Титановый корпус", "Camera Control"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16_pro__9ba8659sh6u_large.jpg" },
    { id: "i16pro", title: "iPhone 16 Pro", price: 999, description: "Мощь Pro в компактном титановом корпусе.", specs: ["A18 Pro", "Дисплей 6.3\"", "4K 120fps"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16_pro__9ba8659sh6u_large.jpg" },
    { id: "i16e", title: "iPhone 16e", price: 599, description: "Самый доступный iPhone 16. Простота и мощь.", specs: ["A18 Chip", "Apple Intelligence", "Ультратонкий"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16__9u7m99i8jn6u_large.jpg" },
    { id: "i16plus", title: "iPhone 16 Plus", price: 899, description: "Большой экран. Огромный заряд батареи.", specs: ["Экран 6.7\"", "A18 Chip", "Camera Control"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16__9u7m99i8jn6u_large.jpg" },
    { id: "i16", title: "iPhone 16", price: 799, description: "Новая эра Apple Intelligence уже здесь.", specs: ["A18 Chip", "Камера 48Мп", "Action Button"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_16__9u7m99i8jn6u_large.jpg" },

    // --- iPHONE 15 SERIES ---
    { id: "i15promax", title: "iPhone 15 Pro Max", price: 999, description: "Первый iPhone с авиационным титаном.", specs: ["A17 Pro", "USB-C", "5x Zoom"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_15_pro__er9cl7p66p6u_large.jpg" },
    { id: "i15pro", title: "iPhone 15 Pro", price: 899, description: "Компактный титан и профессиональная мощь.", specs: ["A17 Pro", "USB-C", "Action Button"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_15_pro__er9cl7p66p6u_large.jpg" },
    { id: "i15plus", title: "iPhone 15 Plus", price: 799, description: "Яркий дизайн и Dynamic Island для всех.", specs: ["A16 Bionic", "USB-C", "Камера 48Мп"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_15__fmx7m69m0p6u_large.jpg" },
    { id: "i15", title: "iPhone 15", price: 699, description: "Надежность и стиль в каждом пикселе.", specs: ["A16 Bionic", "Dynamic Island", "USB-C"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_15__fmx7m69m0p6u_large.jpg" },

    // --- iPHONE 14 SERIES ---
    { id: "i14promax", title: "iPhone 14 Pro Max", price: 899, description: "Классика с Dynamic Island и Always-On дисплеем.", specs: ["A16 Bionic", "Экран 6.7\"", "MagSafe"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_14__db9s3m82os2u_large.jpg" },
    { id: "i14", title: "iPhone 14", price: 599, description: "Проверенное временем качество Apple.", specs: ["A15 Bionic", "Face ID", "Керамический щит"], image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_14__db9s3m82os2u_large.jpg" },

    // --- iPADS ---
    { id: "ipadpro", title: "iPad Pro M4", price: 999, description: "Невероятно тонкий. Абсолютно мощный. OLED дисплей.", specs: ["Чип M4", "Ultra Retina XDR", "Face ID"], image: "https://www.apple.com/v/ipad/home/ce/images/overview/select/ipad_pro__df66u8p7qsyu_large.jpg" },
    { id: "ipadair", title: "iPad Air M2", price: 599, description: "Два размера. Чип M2. Безграничные возможности.", specs: ["Чип M2", "Touch ID", "Apple Pencil Pro"], image: "https://www.apple.com/v/ipad/home/ce/images/overview/select/ipad_air__df66u8p7qsyu_large.jpg" },
    { id: "ipadmini", title: "iPad mini 7", price: 499, description: "Мега-мощь в мини-формате.", specs: ["Чип A17 Pro", "USB-C", "Компактный 8.3\""], image: "https://www.apple.com/v/ipad/home/ce/images/overview/select/ipad_mini__dn66u8p7qsyu_large.jpg" },

    // --- MacBooks ---
    { id: "mbp14", title: "MacBook Pro 14\"", price: 1599, description: "Самый продвинутый ноутбук для работы.", specs: ["Чип M4 Pro", "Liquid Retina XDR", "24 часа работы"], image: "https://www.apple.com/v/macbook-pro/home/aj/images/overview/select/product_tile_mbp_14__dir9jg9mvy6u_large.jpg" },
    { id: "mbp16", title: "MacBook Pro 16\"", price: 2499, description: "Максимальная мощь для профессионалов.", specs: ["Чип M4 Max", "Экран 16.2\"", "Порты HDMI/SDXC"], image: "https://www.apple.com/v/macbook-pro/home/aj/images/overview/select/product_tile_mbp_16__dir9jg9mvy6u_large.jpg" },
    { id: "mba13", title: "MacBook Air 13\" M3", price: 1099, description: "Тонкий, легкий и невероятно быстрый.", specs: ["Чип M3", "Без вентилятора", "MagSafe 3"], image: "https://www.apple.com/v/macbook-air/home/be/images/overview/select/product_tile_mba_13__b7v9jg9mvy6u_large.jpg" }
];

// 5. Роуты (Пути API)
app.get("/", (req, res) => res.send("AppleStore Backend is Working"));

app.get("/api/products", (req, res) => res.json(products));

app.get("/api/balance", authMiddleware, (req, res) => {
    res.json({ balance: req.user.balance });
});

// Роут депозита (используем app.use для подключения роутера из файла)
app.use("/api/deposit", authMiddleware, depositRoute);

// 6. Запуск сервера
const PORT = process.env.PORT || 3000;

// Обработчик уведомлений от CryptoBot
app.post("/api/webhook/cryptopay", (req, res) => {
    const { update_type, payload } = req.body;

    // Если оплата прошла успешно
    if (update_type === "invoice_paid") {
        const amount = parseFloat(payload.amount);
        const description = payload.description;
        
        // Здесь логика поиска пользователя. 
        // В идеале при создании инвойса в 'payload' нужно передавать userId,
        // чтобы здесь знать, кому именно добавить баланс.
        console.log(`Получена оплата: ${amount} за ${description}`);
        
        // В простейшем случае (если userId зашит в описание или payload):
        // users[payload.user_id].balance += amount;
    }
    
    res.status(200).send("OK");
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> Server is ACTIVE on port ${PORT}`);
});
