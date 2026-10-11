const mongoose = require('mongoose')
const dns = require('dns')

dns.setServers(["1.1.1.1" , "8.8.8.8"])

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log("connected to database")
    })
    .catch((err)=> {
        console.error("Error connecting to mongodb" , err)
    })
}


module.exports = connectToDb