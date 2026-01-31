import cron from "node-cron";
import { notify } from "../services/telegram.js";

cron.schedule("*/2 * * * *", async () => {
  // Тут позже подключим реальные проверки блокчейнов
  console.log("Checking payments...");

  // Пример
  // await notify("💰 Найден новый платеж BTC");
});
