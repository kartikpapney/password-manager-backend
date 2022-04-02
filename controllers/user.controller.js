const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require('otp-generator');

const { Account } = require('../models/AccountSchema');
const { Otp } = require('../models/OtpSchema');
const {User} = require('../models/UserSchema')

const signIn = async (req, res) => {
    const number = req.body.number;

    const OTP = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });

    console.log(OTP);

    const salt = await bcrypt.genSalt(10);
    const otphash = await bcrypt.hash(OTP, salt);
    const otp = new Otp({ number: number, otp: otphash });
    const result = await otp.save();
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
        const user = new User(_.pick(req.body, ["number"]));
        const token = user.generateJWT();
        const result = await user.save();
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