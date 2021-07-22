const { v4: uuid } = require('uuid')
const db = require('../db')

class ContactRepository {
    constructor() { }
    getAll() {
        return db.get('contacts')
            .value()
    }
    getById(id) {
        return db.get('contacts')
            .find({ id })
            .value()
    }
    create(body) {
        const id = uuid()
        const record = {
            id,
            ...body,
            ...(body.isVaccinated ? {} : { isVaccinated: false })
        }
        db.get('contacts').push(record).write()
        return record
    }
    update(id, body) {
        const record = db.get('contacts').find({ id }).assign(body).value()
        db.write()
        return record
    }
    remove(id) {
        const [record] = db.get('contacts').remove({ id }).write()
        return record
    }
}
module.exports = ContactRepository