const fs = require('fs/promises')
const path = require('path')
const { AuthService, UserService, UploadAvatarService } = require('../services')
const { UsersRepository } = require('../repository')
const { HttpCode } = require('../helpers/constants')
require('dotenv').config()


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
                subscription: newUser.subscription,
                avatar: newUser.avatar
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
            const { name, email, subscription, avatar } = await serviceUser.findById(id)
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    name,
                    email,
                    avatar,
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

const avatars = async (req, res, next) => {
    try {
        const id = req.user.id
        const uploads = new UploadAvatarService(process.env.AVATAR_OF_USERS)
        const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file })
        // TODO need delete old avatar

        try {
            await fs.unlink(path.join(process.env.AVATAR_OF_USERS, req.user.avatar))
        } catch (e) {
            console.log(e.message)
        }
        await new UsersRepository().updateAvatar(id, avatarUrl)
        res.json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                avatarUrl
            }
        })
    } catch (error) {
        next(error)
    }

}

module.exports = {
    reg,
    login,
    logout,
    getCurrentUser,
    updateSubscription,
    avatars
}