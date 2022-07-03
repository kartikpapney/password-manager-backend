const {Schema, model} = require('mongoose')
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "must provide email"],
        index: true
    },
    name: {
        type: String,
        required: [true, "must provide name"],
        index: false
    },
    password: {
        type: String,
        required: [true, 'must provide master password hash'], 
        index: false
    },
    accounts: {
        type: Array,
        required: false,
        default: []
    },
}, {timestamps: true});

UserSchema.methods.generateJWT = function() {
    const token = jwt.sign({
        email: this.email,
    }, process.env.JWT_SECRET_KEY, {expiresIn: '300s'});
    return token;
}

module.exports.User = model('User', UserSchema)