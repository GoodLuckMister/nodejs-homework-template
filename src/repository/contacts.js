const Contact = require('../schema/contact')

class ContactRepository {
    constructor() {
        this.model = Contact
    }
    async getAll({ limit = 5, offset = 0, sortBy, sortByDesc, filter }) {
        const { docs: contacts, totalDocs: total } = await this.model.paginate({},
            {
                limit,
                offset,
                sort: {
                    ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
                    ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
                },
                select: filter ? filter.split('|').join(' ') : '',
                populate: {
                    path: 'owner',
                    select: 'name email subscription -_id'
                }
            }
        )
        return { contacts, total, limit: Number(limit), offset: Number(offset) }
    }

    async getById(id) {
        const result = await this.model.find({ _id: id }).populate({
            path: 'owner',
            select: 'name email subscription -_id'
        })
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