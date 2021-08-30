const { HttpCode } = require('../helpers/constants')
const { ContactService } = require('../services')

const contactsService = new ContactService()

const getAll = async (req, res, next) => {
    try {

        const userId = req.user.id
        const contacts = await contactsService.getAll(userId, req.query)

        res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { ...contacts }
        })
    } catch (e) {
        next(e)
    }
}


const getById = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contact = await contactsService.getById(userId, req.params)
        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { contact }
        })

    } catch (e) {
        next({
            status: HttpCode.NOT_FOUND,
            message: 'Not found contact',
            data: 'Not found'
        })
    }
}


const create = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contact = await contactsService.create(userId, req.body)
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: { contact }
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contact = await contactsService.update(userId, req.params, req.body)

        if (contact) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: { contact }
            })
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: 'Not found contact',
                data: 'Not found',
            })
        }

    } catch (e) {
        next(e)
    }
}


const remove = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contact = await contactsService.remove(userId, req.params)
        if (contact) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: { contact }
            })
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: 'Not found contact',
                data: 'Not found',
            })
        }

    } catch (e) {
        next(e)
    }
}
module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
}