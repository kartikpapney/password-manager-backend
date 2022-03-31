const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    accountPasswordCipher: {
        type: String,
        required: [true, 'must provide passwordHash'],
    },
    accountId: {
        type: String,
        required: [true, 'must provide user account name']
    },
    accountProvider: {
        type: String,
        required: [true, 'must provide account provider name']
    },
    accountRemarks: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Account', AccountSchema)