const { update } = require('../controllers/contacts')
const ContactRepo = require('../repository/contacts')

jest.mock('../repository/contacts')

describe('Unit test controller contacts', () => {
    const req = { user: { id: null }, body: {}, params: { id: null } }
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(data => data)
    }
    const next = jest.fn(data => data)

    it('Update contacts: Repository  right', async () => {
        const contact = { name: 'Al', email: 'mail', favorite: true }
        jest.spyOn(ContactRepo.prototype, 'update')
            .mockReturnValue(contact);
        const result = await update(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual('success')
        expect(result.code).toEqual(200)
        expect(result.data).toEqual({ contact })
    })
    it('Update contacts not exist', async () => {
        jest.spyOn(ContactRepo.prototype, 'update')
            .mockReturnValue()
        const result = await update(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual(404)
        expect(result.message).toEqual('Not found contact')
        expect(result.data).toEqual('Not found')
    })
    it('update contact with error', async () => {
        jest.spyOn(ContactRepo.prototype, 'update').mockImplementation(() => { throw new Error('ops') })
        await update(req, res, next)
        expect(next).toHaveBeenCalled()
    })
})