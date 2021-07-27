const { MongoClient } = require('mongodb')
require('dotenv').config({ path: '../../.env' })
const uriDb = "mongodb+srv://Pirogok0_0:Pirogok12345@myfreecluster.f3lsj.mongodb.net/test"

const client = new MongoClient(uriDb, { useNewUrlParser: true, useUnifiedTopology: true }).connect()


process.on('SIGINT', async () => {
    await client
    client.close()
    console.log('Connection for DB disconnected and terminated')
    process.exit()
})

module.exports = client
