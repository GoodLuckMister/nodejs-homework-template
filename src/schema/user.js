const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const SALT_FACTOR = 6
const { Schema } = mongoose
const { SubScribe } = require('../helpers/constants')

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
        enum: {
            values: [SubScribe.STARTER, SubScribe.PRO, SubScribe.BUSINESS],
            message: 'This Subscription type is not defined'
        },
        default: SubScribe.STARTER
    },
    token: {
        type: String,
        default: null,
    },
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

const User = mongoose.model('user', userSchema);

module.exports = User
