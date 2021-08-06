const Joi = require('joi')
const { HttpCode, SubScribe } = require('../helpers/constants')


const schemaUpdateUser = Joi.object({
    subscription: Joi.string().valid(...(Object.values(SubScribe)))
})

const validate = (schema, body, next) => {
    const { error } = schema.validate(body)
    if (error) {
        const [{ message }] = error.details
        return next({
            status: HttpCode.BAD_REQUEST,
            message: `Field ${message.replace(/"/g, '')}`,
            data: 'Bad request'
        })
    }
    next()
}


const validateUpdateUser = (req, res, next) => {
    return validate(schemaUpdateUser, req.body, next)
}
module.exports = {
    validateUpdateUser,
}
