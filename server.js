require('dotenv').config()
const express = require('express')
const cors = require('cors')

const depositRoutes = require('./routes/deposit')
const orderRoutes = require('./routes/orders')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/deposit', depositRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.json({ status: 'Backend is running 🚀' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
