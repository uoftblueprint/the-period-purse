// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')

const uri = "mongodb+srv://admin:{PASSWORD}@tpp-test.x0mi7.mongodb.net/tpp?retryWrites=true&w=majority";

mongoose
    .connect(uri, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db