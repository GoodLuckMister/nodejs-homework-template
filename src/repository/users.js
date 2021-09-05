const User = require('../schema/user')

class UsersRepository {
    constructor() {
        this.Model = User
    }

    async findById(id) {
        const result = await this.Model.findOne({ _id: id })
        return result
    }

    async findByEmail(email) {
        const result = await this.Model.findOne({ email })
        return result
    }

    async findByVerifyToken(verifyToken) {
        const result = await this.Model.findOne({ verifyToken })
        return result
    }

    async create(body) {
        const user = new this.Model(body)
        return user.save()
    }

    async updateToken(id, token) {
        await this.Model.updateOne({ _id: id }, { token })
    }

    async updateTokenVerify(id, isVerified, verifyToken) {
        await this.Model.updateOne({ _id: id }, { isVerified, verifyToken })
    }

    async updateSubscription(id, body) {
        const result = await this.Model.findByIdAndUpdate(
            { _id: id },
            { ...body },
            { new: true }
        )
        return result
    }

    async updateAvatar(id, avatarURL, idCloudAvatar = null) {
        return await this.Model.updateOne({ _id: id }, { avatarURL, idCloudAvatar })
    }

}

module.exports = UsersRepository