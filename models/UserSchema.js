const mongoose = require('mongoose')
const AccountSchema = require('./AccountSchema.js');
const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'must provide user id'], 
    },
    masterPasswordHash: {
        type: String,
        required: [true, 'must provide master password hash'], 
    },
    accounts: {
        type: Array
    },
})

module.exports = mongoose.model('Task', TaskSchema)