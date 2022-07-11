const otpGenerator = require('otp-generator');
const { Otp } = require('../models/OtpSchema');
const {User} = require('../models/UserSchema');
const {redisClient} = require('../db/redis.js');

const DEFAULT_EXPIRATION = 300;

const generateOTP = () => {
    return otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
}

const signUp = async(req, res) => {
    const client = await redisClient();
    const {name, email, password} = req.body;
    const user = await User.findOne({email: email});
    if(user) {
        res.send({error: "A user already registered with this email"});
    } else {
        const OTP = generateOTP();
        const nuser = {
            email: email,
            name: name,
            password: password,
            otp: OTP
        }
        client.setEx(nuser.email, DEFAULT_EXPIRATION, JSON.stringify({user: nuser}));
        console.log(OTP);
        res.render('otp', {email: nuser.email});
    }
}
const verifyOTP = async(req, res) => {
    const client = await redisClient();
    const {email, otp} = req.body;
    const user = JSON.parse(await client.get(email)).user;
    console.log(user);
    const validUser = (otp == user.otp);
    if (validUser) {
        const nuser = new User({name: user.name, email: user.email, password: user.password})
        const result = await nuser.save();
        const token = nuser.generateJWT();
        const OTPDelete = await Otp.deleteMany({
            number: nuser.number
        });
        res.status(200).render('../views/saveToken', {token: token});
    } else {
        res.status(400).send("Invalid!")
    }
}

const signIn = async(req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email, password: password}).then((user) => {
        if(user) {
            const token = user.generateJWT();
            res.status(200).render('../views/saveToken', {token: token});
        } else {
            console.log("Not Exist");
            res.redirect('/signup');
        }
    });
}

module.exports = {signIn, verifyOTP, signUp};