const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { UserService } = require('../services')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()

}

passport.use(new Strategy(params, async (payload, done) => {
    try {
        console.log("🚀 ~ file: passport.js ~ line 14 ~ passport.use ~ payload", payload)
        const service = new UserService()
        const user = await service.findById(payload.id)
        console.log("🚀 ~ file: passport.js ~ line 17 ~ passport.use ~ user", user)
        if (!user) {
            return done(new Error('User not found'))
        }
        if (!user.token) {
            return done(null, false)
        }

        return done(null, user)
    } catch (e) {
        done(e)
    }

}));