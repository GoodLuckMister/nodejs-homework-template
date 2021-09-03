const ContactService = require('./contacts')
const AuthService = require('./auth')
const UserService = require('./user')
const UploadAvatarService = require('./local-upload')
const EmailService = require('./email')
const { CreateSenderNodemailer, CreateSenderSendGrid } = require('./email-sendler')

module.exports = {
    ContactService,
    AuthService,
    UserService,
    UploadAvatarService,
    EmailService,
    CreateSenderNodemailer,
    CreateSenderSendGrid
}

