const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@tpp-test.x0mi7.mongodb.net/tpp?retryWrites=true&w=majority`;

mongoose
    .connect(uri, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db