require('dotenv').config()

const app = require('./src/App')
const connectToDb = require('./src/config/Database')

connectToDb()

app.listen(3000 , () => {
    console.log("Server is running on port 3000")
})