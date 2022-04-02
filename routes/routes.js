const express = require('express')
const routes = express.Router()

const {
    insertPassword,
    deletePassword,
    updatePassword,
    deleteAllPasswords,
    getAllPasswords,
} = require('../controllers/pasword.controller.js');

const {
    signIn,
    verify
} = require('../controllers/user.controller.js');

routes
.route('/signin').post(signIn);
routes
.route('/signin/verify').post(verify)

module.exports = routes