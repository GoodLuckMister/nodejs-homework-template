const request = require('supertest')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = require('../app')
const db = require('../db')
const User = require('../schema/user')
const Contact = require('../schema/contact')
const UsersRepository = require('../repository/users')
const { newContact, newUser } = require('./data/data')


describe('Test rout contacts', () => {
    let user, token
    beforeAll(async () => {
        await db
        await User.deleteOne({ email: newUser.email, })
        user = await User.create(newUser)
        const SECRET_KEY = process.env.JWT_SECRET_KEY
        const issueToken = (payload, secret) => jwt.sign(payload, secret)
        token = issueToken({ id: user.id }, SECRET_KEY)
        await new UsersRepository().updateToken(user._id, token)
    })

    afterAll(async () => {
        const mongo = await db
        await User.deleteOne({ email: newUser.email })
        await mongo.disconnect()
    })
    beforeEach(async () => {
        await Contact.deleteMany({})
    })
    describe('GET request', () => {
        it('should return status 200 get all contacts', async () => {
            const response = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toEqual(200)
            expect(response.body).toBeDefined()
            expect(response.body.data.contacts).toBeInstanceOf(Array)
        })
        it('should return status 200 get contact by id', async () => {
            const contact = await Contact.create({ ...newContact, owner: user._id })
            const response = await request(app)
                .get(`/api/contacts/${contact._id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toEqual(200)
            expect(response.body).toBeDefined()
            expect(response.body.data.contact).toBeInstanceOf(Array)
            expect(response.body.data.contact[0]._id).toBe(String(contact._id))
        })
        it('should return status 404 get contact without id', async () => {
            const fakeId = '61085091c266651e4488a281b'
            const response = await request(app)
                .get(`/api/contacts/${fakeId}`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toEqual(404)
            expect(response.body).toBeDefined()
        })
        it('should return status 404 get contact wrong id', async () => { })
    })
    describe('POST request', () => { })
})
