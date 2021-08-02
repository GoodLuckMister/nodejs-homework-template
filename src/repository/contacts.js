const Contact = require('../schema/contact')

class ContactRepository {
    constructor() {
        this.model = Contact
    }
    async getAll() {
        const result = await this.model.find({})
        return result
    }

    async getById(id) {
        const result = await this.model.find({ _id: id })
        return result
    }

    async create(body, userId) {
        const result = await this.model.create({ ...body, owner: userId })
        return result
    }

    async update(id, body) {
        const result = await this.model.findByIdAndUpdate(
            { _id: id },
            { ...body },
            { new: true }
        )
        return result
    }

    async remove(id) {
        const result = await this.model.findByIdAndDelete({ _id: id })
        return result
    }
}

module.exports = ContactRepository