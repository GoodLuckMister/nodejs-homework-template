const { ContactRepository } = require('../repository')

class ContactService {
    constructor() {
        this.repositories = {
            contacts: new ContactRepository()
        }
    }
    async getAll() {
        const data = await this.repositories.contacts.getAll()
        return data
    }
    async getById({ id }) {
        const data = await this.repositories.contacts.getById(id)
        return data
    }
    async create(body, userId) {
        const data = await this.repositories.contacts.create(body, userId)
        return data
    }
    async update({ id }, body) {
        const data = await this.repositories.contacts.update(id, body)
        return data
    }
    async remove({ id }) {
        const data = await this.repositories.contacts.remove(id)
        return data
    }

}
module.exports = ContactService