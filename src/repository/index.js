const { ObjectId } = require('mongodb')
const HttpCode = require('../helpers/constants')
const { ErrorHandler } = require('../helpers/errorhandler')

class ContactRepository {
    constructor(client) {
        const database = client.db('GoIt')
        this.collection = database.collection('contacts')
    }

    #getMongoId(id) {
        try {
            return ObjectId(id)
        } catch (e) {
            throw new ErrorHandler(HttpCode.BAD_REQUEST, `Mongodb _id : ${e.message}`, 'Bad request')
        }
    }

    async getAll() {
        const result = await this.collection.find({}).toArray()
        return result
    }

    async getById(id) {
        const objectId = this.#getMongoId(id)
        const [result] = await this.collection.find({ _id: objectId }).toArray()
        return result
    }

    async create(body) {
        const result = { ...body, ...(body.isVaccinated ? {} : { isVaccinated: false }) }
        await this.collection.insertOne(result)
        return result
    }

    async update(id, body) {
        const objectId = this.#getMongoId(id)
        const { value: result } = await this.collection.findOneAndUpdate({ _id: objectId }, { $set: body }, { returnDocument: 'after' })
        return result
    }

    async remove(id) {
        const objectId = this.#getMongoId(id)
        const { value: result } = await this.collection.findOneAndDelete({ _id: objectId })
        return result
    }
}

module.exports = { ContactRepository }