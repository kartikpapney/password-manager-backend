const {Schema, model} = require('mongoose')
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    number: {
        type: String,
        required: [true, 'must provide user number'], 
    },
    // masterPasswordHash: {
    //     type: String,
    //     required: [false, 'must provide master password hash'], 
    // },
    // accounts: {
    //     type: Array,
    //     required: false
    // },
}, {timestamps: true});

UserSchema.methods.generateJWT = () => {
    const token = jwt.sign({
        _id: this._id,
        number: this.number
    }, process.env.JWT_SECRET_KEY, {expiresIn: '30s'});
    return token;
}


module.exports.User = model('User', UserSchema)