const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
    constructor(env, sender) {
        this.sender = sender
        switch (env) {
            case 'development':
                this.link = 'http://localhost:3000'
                break
            case 'production':
                this.link = process.env.LINK_THIS_APP
                break
            default:
                this.link = 'https://2f8e-185-209-58-177.ngrok.io'
                break
        }
    }

    #createTemplateVerificationEmail(verifyToken, name) {
        const mailGenerator = new Mailgen({
            theme: 'cerberus',
            product: {
                name: 'Alexey System',
                link: this.link
            }
        })
        const email = {
            body: {
                name,
                intro: 'Welcome to Alexey system! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with Alexey, please click here:',
                    button: {
                        color: '#22BC66',
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verifyToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }
        return mailGenerator.generate(email);
    }

    async sendVerifyEmail(verifyToken, email, name) {
        const emailHtml = this.#createTemplateVerificationEmail(verifyToken, name)
        const msg = {
            to: email,
            subject: 'Verify your contact',
            html: emailHtml
        }
        const result = await this.sender.send(msg)
        console.log(result)
    }
}

module.exports = EmailService