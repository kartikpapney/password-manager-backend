const {Schema, model} = require('mongoose');

module.exports.Otp = model('Otp', Schema({
    number: {
        type: String,
        required: true,
        index: true,
        unique: true
    }, 
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    time: {type: Date, default: Date.now(), index: {expires: '30s'}}
}))