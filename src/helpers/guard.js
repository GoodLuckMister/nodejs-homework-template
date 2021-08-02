const passport = require('passport')
require('../config/passport')
const { HttpCode } = require('./constants')

const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error || !user) {
            return next({
                status: HttpCode.FORBIDDEN,
                message: 'Forbidden'
            })
        }
        req.user = user
        // req.locals.user = user переменная на текущей сессии
        // req.app.locals.vars - глобальная переменная

        return next()
    })(req, res, next)
}
module.exports = guard