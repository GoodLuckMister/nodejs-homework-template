const user = require('../schema/user')

class UsersRepository {
    constructor() {
        this.model = user
    }

    async findById(id) {
        const result = await this.model.findOne({ _id: id })
        return result
    }
    async findByEmail(email) {
        const result = await this.model.findOne({ email })
        return result
    }

    async create(body) {
        const user = new this.model(body)
        return user.save()
    }

    async updateToken(id, token) {
        await this.model.updateOne({ _id: id }, { token })
    }

    async updateSubscription(id, body) {
        const result = await this.model.findByIdAndUpdate(
            { _id: id },
            { ...body },
            { new: true }
        )
        return result
    }
}

module.exports = UsersRepository