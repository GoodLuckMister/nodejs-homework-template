const { ContactRepository } = require('../repository')
const db = require('../db')

class ContactService {
    constructor() {
        this.repositories = {
            contacts: new ContactRepository()
        }
    }
    async getAll(userId, query) {
        const data = await this.repositories.contacts.getAll(userId, query)
        const { page, docs: contacts, totalDocs: total, limit } = data
        return { contacts, page, limit, total }
    }
    async getById(userId, { id }) {
        const data = await this.repositories.contacts.getById(userId, id)
        return data
    }
    async create(userId, body) {
        const data = await this.repositories.contacts.create(userId, body)
        return data
    }
    async update(userId, { id }, body) {
        const data = await this.repositories.contacts.update(userId, id, body)
        return data
    }
    async remove(userId, { id }) {
        const data = await this.repositories.contacts.remove(userId, id)

        return data
    }

}
module.exports = ContactService