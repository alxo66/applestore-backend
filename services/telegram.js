const axios = require('axios')

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

async function notifyAdmin(text) {
  if (!BOT_TOKEN || !CHAT_ID) return

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

  await axios.post(url, {
    chat_id: CHAT_ID,
    text
  })
}

module.exports = { notifyAdmin }
