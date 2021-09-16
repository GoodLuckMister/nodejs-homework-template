const fs = require('fs/promises')
// const path = require('path')


const { AuthService,
    UserService,
    UploadAvatarService,
    EmailService,
    CreateSenderNodemailer,
    CreateSenderSendGrid
} = require('../services')
const { UsersRepository } = require('../repository')
const { HttpCode } = require('../helpers/constants')

require('dotenv').config()


const serviceUser = new UserService()
const serviceAuth = new AuthService()


// const STATIC_OF_USERS = process.env.STATIC_OF_USERS
// const AVATARS = process.env.AVATARS




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

        try {
            const emailService = new EmailService(process.env.NODE_ENV, new CreateSenderSendGrid())
            await emailService.sendVerifyEmail(newUser.verifyToken, newUser.email, newUser.name)

        } catch (e) {
            console.log(e.message)
        }


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

            const { name, email, subscription, avatarURL } = await serviceUser.findById(id)

            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    name,
                    email,
                    subscription,
                    avatarURL
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


// const avatars = async (req, res, next) => {
//     try {
//         const id = req.user.id
//         const uploads = new UploadAvatarService(path.join(STATIC_OF_USERS, AVATARS))
//         const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file })
//         try {
//             await fs.unlink(path.join(STATIC_OF_USERS, AVATARS, req.user.avatar))
//         } catch (e) {
//             console.log(e.message)
//         }
//         await new UsersRepository().updateAvatar(id, avatarUrl)
//         res.json({
//             status: 'success',
//             code: HttpCode.OK,
//             data: {
//                 avatarUrl
//             }
//         })
//     } catch (error) {
//         next(error)
//     }

// }


const avatars = async (req, res, next) => {
    try {
        const id = req.user.id
        const uploads = new UploadAvatarService()
        const { idCloudAvatar, avatarUrl } = await uploads.saveAvatar(
            req.file.path,
            req.user.idCloudAvatar)

        await fs.unlink(req.file.path)
        await new UsersRepository().updateAvatar(id, avatarUrl, idCloudAvatar)
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

const verify = async (req, res, next) => {
    try {

        const user = await new UsersRepository().findByVerifyToken(req.params.token)

        if (user) {
            await new UsersRepository().updateTokenVerify(user.id, true, null)

            return res.json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    message: 'Success!'
                }
            })
        }
        return res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            message: 'Verification token is valid',

        })
    } catch (error) {
        next(error)
    }

}
const repeatEmailVerification = async (req, res, next) => {
    try {
        const user = await new UsersRepository().findByEmail(req.body.email)
        if (user) {
            const { name, email, isVerified, verifyToken } = user
            if (!isVerified) {
                const emailService = new EmailService(process.env.NODE_ENV, new CreateSenderNodemailer(
                ))
                await emailService.sendVerifyEmail(verifyToken, email, name)
                return res.json({
                    status: 'success',
                    code: HttpCode.OK,
                    data: {
                        message: 'Resubmitted success'
                    }
                })
            }
            return res.status(HttpCode.BAD_REQUEST).json({
                status: 'error',
                code: HttpCode.BAD_REQUEST,
                message: 'Email has been verified'
            })
        }
        return res.status(HttpCode.NOT_FOUND).json({
            status: 'error',
            code: HttpCode.NOT_FOUND,
            message: 'User not found'

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
    avatars,
    verify,
    repeatEmailVerification
}