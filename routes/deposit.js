const express = require('express')
const QRCode = require('qrcode')

const router = express.Router()

router.get('/', async (req, res) => {
  const wallets = {
    BTC: 'bc1qlgf034j5nhqh0ltsqnhrepchlxwlykrtujvupq',
    ETH: '0x5Fc25f19E18Dfc7d19595cB7d1eB0D0605b9A3FA',
    USDT: 'TMM1xGXxAY9R66hGPxKNfxo81KrmdyrszE',
    TON: 'UQD-XSYf6P-NyjbSJYDHsgHnk0e5CiJQ2-NCZddro_5-c8B4'
  }

  const qr = {}
  for (const key in wallets) {
    qr[key] = await QRCode.toDataURL(wallets[key])
  }

  res.json({ wallets, qr })
})

module.exports = router
