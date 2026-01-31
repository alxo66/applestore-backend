const express = require('express')
const QRCode = require('qrcode')

const router = express.Router()

router.post('/qr', async (req, res) => {
  const { address, amount } = req.body

  try {
    const qr = await QRCode.toDataURL(`${address}?amount=${amount}`)
    res.json({ qr })
  } catch (e) {
    res.status(500).json({ error: 'QR generation failed' })
  }
})

module.exports = router
