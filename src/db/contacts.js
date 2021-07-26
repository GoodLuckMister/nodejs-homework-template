const path = require('path')
const Low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(path.join(__dirname, '..', '..', 'model', 'db.json'))
const db = new Low(adapter)

db.defaults({ contacts: [] })

module.exports = db