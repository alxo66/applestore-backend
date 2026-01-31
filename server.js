require('dotenv').config()
const express = require('express')
const cors = require('cors')

const depositRoutes = require('./routes/deposit')

// ⏱ запускаем cron
require('./cron/checkPayments')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/deposit', depositRoutes)

app.get('/', (req, res) => {
  res.send('AppleStore backend is running 🚀')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
