const cron = require('node-cron')
const checkPayment = require('../services/blockchain')
const sendTelegram = require('../services/telegram')

cron.schedule('*/1 * * * *', async () => {
  console.log('Checking payments...')

  // тут будет проверка платежей и уведомления
})
