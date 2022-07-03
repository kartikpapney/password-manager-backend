const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require('otp-generator');
const Redis = require('redis');
const { Account } = require('../models/AccountSchema');
const { Otp } = require('../models/OtpSchema');
const {User} = require('../models/UserSchema');

const {redisClient} = require('../db/redis.js');

const DEFAULT_EXPIRATION = 300;

const generateOTP = async() => {
    return new Promise((resolve, reject) => {
        const OTP = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        resolve(OTP);
    })
}

const signIn = async (req, res) => {
    const {number} = req.body;
    const OTP = await generateOTP();
    const client = await redisClient();
    client.setEx(number, DEFAULT_EXPIRATION, OTP);
    console.log(OTP);
    return res.status(200).send("Otp send successfully!");
}

const verify = async (req, res) => {
    const otpHolder = await Otp.find({
        number: req.body.number
    });
    if (otpHolder.length === 0) return res.status(400).send("Invalid!");
    const otp = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, otp.otp);

    if (validUser) {
        const user = new User({number: otp.number, name: otp.name, password: otp.password}, { upsert: true });
        const result = await user.save();
        const token = user.generateJWT();
        const OTPDelete = await Otp.deleteMany({
            number: otp.number
        });
        return res.status(200).send({
            message: "User Login Successfull!",
            token: token,
            data: result
        });
    } else {
        return res.status(400).send("Invalid!")
    }
}

module.exports = {signIn, verify};