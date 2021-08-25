const mongoose = require('mongoose');
const { Schema } = mongoose

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    isVaccinated: {
        type: Boolean,
        default: false,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    features: {
        type: Array,
        set: (data) => (!data ? [] : data)
    },
    job: { position: String, age: Number }
},
    {
        versionKey: false,
        timestamps: true
    }
)

const contact = mongoose.model('contact', contactSchema);

module.exports = contact

