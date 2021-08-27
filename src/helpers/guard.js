const passport = require('passport')
require('../config/passport')
const { HttpCode } = require('./constants')

const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error) {
            return next({
                status: HttpCode.FORBIDDEN,
                message: 'Forbidden'
            })
        }
        if (!user) {
            return next({
                status: HttpCode.UNAUTHORIZED,
                message: 'Not authorized'
            })
        }
        req.user = user
        // req.locals.user = user переменная на текущей сессии
        // req.app.locals.vars - глобальная переменная

        return next()
    })(req, res, next)
}
module.exports = guard