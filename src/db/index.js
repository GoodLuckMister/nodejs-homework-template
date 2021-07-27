const { MongoClient } = require('mongodb')
require('dotenv').config()
const uriDb = process.env.URI_DB

const client = new MongoClient(uriDb, { useNewUrlParser: true, useUnifiedTopology: true }).connect()

process.on('SIGINT', async () => {
    await client
    client.close()
    console.log('Connection for DB disconnected and terminated')
    process.exit()
})

module.exports = client
