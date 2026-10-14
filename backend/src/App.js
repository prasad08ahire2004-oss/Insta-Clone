const express = require('express')
const cookieparser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cookieparser())
app.use(cors({
  credentials:true,
  origin: 'http://localhost:5173'
}))

app.use('/api/auth' , authRouter)
// yaha hum api ka path decide karte hai [http://localhost:3000/api/auth/register or login]

module.exports = app