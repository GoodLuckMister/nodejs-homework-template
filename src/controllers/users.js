const { AuthService, UserService } = require('../services')
const { HttpCode } = require('../helpers/constants')

const serviceUser = new UserService()
const serviceAuth = new AuthService()


const reg = async (req, res, next) => {
    const { name, email, password, subscription } = req.body
    const user = await serviceUser.findByEmail(email)
    if (user) {
        return next({
            status: HttpCode.CONFLICT,
            data: 'Conflict',
            message: 'This email is already use'
        })
    }
    try {
        const newUser = await serviceUser.create({ name, email, password, subscription })
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                email: newUser.email,
                subscription: newUser.subscription
            }
        })
    } catch (e) {
        next(e)
    }
}
const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const token = await serviceAuth.login({ email, password })
        if (token) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    token
                }
            })
        }
        next({
            status: HttpCode.UNAUTHORIZED,
            message: 'Invalid credentials'
        })
    } catch (e) {
        next(e)
    }
}
const logout = async (req, res, next) => {
    try {
        const id = req.user.id
        await serviceAuth.logout(id)
        return res.status(HttpCode.NO_CONTENT).json({
            status: 'success',
            code: HttpCode.NO_CONTENT,
            data: 'unauthorized'
        })
    } catch (e) {
        next(e)
    }

}

const getCurrentUser = async (req, res, next) => {
    try {
        const id = req.user.id
        if (id) {
            const { email, subscription } = await serviceUser.findById(id)
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    email,
                    subscription
                }
            })
        }
        next({
            status: HttpCode.UNAUTHORIZED,
            message: 'Not authorized'
        })
    } catch (e) {
        next(e)
    }

}
const updateSubscription = async (req, res, next) => {
    try {
        const id = req.user.id
        const { subscription } = req.body
        if (!subscription) {
            return next({
                status: HttpCode.BAD_REQUEST,
                message: '',
                data: 'User did not update',
            })
        }
        const user = await serviceUser.updateSubscription(id, req.body)
        if (user) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: { user }
            })
        } else {
            return next({
                status: HttpCode.BAD_REQUEST,
                message: 'Not found user',
                data: 'User did not update',
            })
        }

    } catch (e) {
        next(e)
    }
}

module.exports = {
    reg,
    login,
    logout,
    getCurrentUser,
    updateSubscription
}