const mongoose = require('mongoose');
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose database connection successful`)
})

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected`)
})

mongoose.connection.on('error', (e) => {
    console.log(`Mongoose connection error: ${e.message}`)
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Connection for DB disconnected and terminated')
        process.exit(1)
    })
})

module.exports = db