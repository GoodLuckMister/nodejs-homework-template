const { db } = require('../db')

class ContactRepository {
    constructor() {
        this.db = db
    }
    async getAll() {
        const result = await this.db.models.Contact.findAll({})
        return result
    }

    async getById(id) {
        const result = await this.db.models.Contact.findOne({ where: { id } })
        return result
    }

    async create(body) {
        const result = await this.db.models.Contact.create(body)
        return result
    }

    async update(id, body) {
        const result = await this.db.models.Contact.findOne({ where: { id } })
        if (!result) {
            return null
        }
        return result.update(body)
    }

    async remove(id) {
        const result = await this.db.models.Contact.findOne({ where: { id } })
        if (!result) {
            return null
        }
        return result.destroy()
    }
}

module.exports = { ContactRepository }