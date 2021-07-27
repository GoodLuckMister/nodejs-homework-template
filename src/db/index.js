const { MongoClient } = require('mongodb')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = new MongoClient(uriDb, { useNewUrlParser: true, useUnifiedTopology: true }).connect()

process.on('SIGINT', async () => {
    await db
    db.close()
    console.log('Connection for DB disconnected and terminated')
    process.exit()
})

module.exports = db
