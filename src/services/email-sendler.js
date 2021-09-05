const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()


class CreateSenderSendGrid {
    async send(msg) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        return await sgMail.send({ ...msg, from: 'paet14@meta.ua' })
    }
}

class CreateSenderNodemailer {
    async send(msg) {
        const config = {
            host: 'smtp.meta.ua',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_EMAIL
            }
        }
        const transporter = nodemailer.createTransport(config)
        return await transporter.sendMail({ ...msg, from: process.env.USER_EMAIL })
    }
}

module.exports = { CreateSenderNodemailer, CreateSenderSendGrid }