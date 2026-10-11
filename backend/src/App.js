const express = require('express')
const cookieparser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')

const app = express()
app.use(express.json())

app.use(cookieparser())

app.use('/api/auth' , authRouter)
// yaha hum api ka path decide karte hai [http://localhost:3000/api/auth/register]

module.exports = app