const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const { SubScribe } = require('../helpers/constants')
const gr = require('gravatar')

const SALT_FACTOR = 6

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        default: 'Guest',
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate(value) {
            const re = /\S+@\S+\.\S+/
            return re.test(String(value).toLowerCase())
        }
    },
    subscription: {
        type: String,
        enum: [SubScribe.STARTER, SubScribe.PRO, SubScribe.BUSINESS],
        default: SubScribe.STARTER
    },
    token: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: function () {
            return gr.url(this.email, { s: 250 }, true)
        }
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(
        this.password,
        bcrypt.genSaltSync(SALT_FACTOR)
    )
    next()
})

// userSchema.path('email').validate(function (value) {
//     const re = /\S+@\S+\.\S+/
//     return re.test(String(value).toLowerCase())
// })

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema);

module.exports = User

