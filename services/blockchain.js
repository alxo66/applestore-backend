const axios = require('axios')

const BTC_ADDRESS = process.env.BTC_ADDRESS

// ВРЕМЕННО: мок
async function checkBTC() {
  // здесь позже подключим реальную БД
  return []
}

module.exports = { checkBTC }
