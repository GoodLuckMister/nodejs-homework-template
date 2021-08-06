const Joi = require('joi')
const HttpCode = require('../helpers/constants')

const schemaCreateContact = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(9).max(100).required(),
    phone: Joi.string().alphanum().min(12).max(15).optional(),
    features: Joi.array().optional(),
    favorite: Joi.boolean().optional(),
    owner: Joi.string().required()
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(100).optional(),
    email: Joi.string().alphanum().min(9).max(100).optional(),
    phone: Joi.string().alphanum().min(12).max(15).optional(),
    features: Joi.array().optional(),
    favorite: Joi.boolean().optional(),
    owner: Joi.string().optional()

})

const schemaStatusContact = Joi.object({ favorite: Joi.boolean().required() })

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

module.exports.validateCreateContact = (req, res, next) => {
    return validate(schemaCreateContact, req.body, next)
}
module.exports.validateUpdateContact = (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
}
module.exports.validateUpdateStatusContact = (req, res, next) => {
    return validate(schemaStatusContact, req.body, next)
}
