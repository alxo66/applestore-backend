const cron = require('node-cron')
const { checkBTC } = require('../services/blockchain')
const { notifyAdmin } = require('../services/telegram')

cron.schedule('*/1 * * * *', async () => {
  console.log('🔍 Checking BTC payments...')

  const paidOrders = await checkBTC()

  for (const order of paidOrders) {
    await notifyAdmin(
      `💰 Оплата получена!\nЗаказ: ${order.id}\nСумма: ${order.amount} BTC`
    )
  }
})
