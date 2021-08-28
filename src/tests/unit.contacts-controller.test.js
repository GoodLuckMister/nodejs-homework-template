const { update } = require('../controllers/contacts')
const Contact = require('../repository/contacts')

jest.mock('../repository/contacts')

describe('Unit test controller contacts', () => {
    const req = { user: { id: 1 }, body: {}, params: { id: 1 } }
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(data => data)
    }
    const next = jest.fn(data => data)

    it('update contact', async () => {
        Contact.update = jest.fn(() => {
            return { id: 3, name: 'ass', age: 1 }
        })

        try {
            const result = await update(req, res, next)
            console.log(result)
        } catch (e) {
            console.log(e)
        }

    })
})