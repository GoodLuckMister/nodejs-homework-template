const { ContactRepository } = require('../repository')
const db = require('../db')

class ContactService {
    constructor() {
        process.nextTick(async () => {
            const client = await db
            this.repositories = {
                contacts: new ContactRepository(client)
            }
        })

    }
    async getAll() {
        const data = await this.repositories.contacts.getAll()
        return data
    }
    async getById({ id }) {
        const data = await this.repositories.contacts.getById(id)
        return data
    }
    async create(body) {
        const data = await this.repositories.contacts.create(body)
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
module.exports = { ContactService }