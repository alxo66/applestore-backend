const axios = require('axios')

const sendTelegram = async (text) => {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`

  await axios.post(url, {
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text
  })
}

module.exports = sendTelegram
