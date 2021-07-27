const { ObjectId } = require('mongodb')

class ContactRepository {
    constructor(clientDB) {
        const database = clientDB.db('GoIt')
        this.collection = database.collection('contacts')
    }
    async getAll() {
        const result = await this.collection.find({}).toArray()
        return result
    }
    async getById(id) {
        const objectId = ObjectId(id)
        const [result] = await this.collection.find({ _id: objectId }).toArray()
        return result

    }
    async create(body) {
        const record = {
            ...body,
            ...(body.isVaccinated ? {} : { isVaccinated: false })
        }
        const { ops: [result] } = await this.collection.insert(record)
        console.log(result);
        return result
    }
    async update(id, body) {
        const record = db.get('contacts').find({ id }).assign(body).value()
        db.write()
        return record.id ? record : null
    }
    async remove(id) {
        const [record] = db.get('contacts').remove({ id }).write()
        return record
    }
}
module.exports = ContactRepository