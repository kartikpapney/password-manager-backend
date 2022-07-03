const express = require('express')
const verifyToken = require('../middleware/middleware.js');
const routes = express.Router();
const {User} = require("../models/UserSchema");

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

// routes
// .route('/signin').post(signIn);
// routes
// .route('/signin/verify').post(verify);
// routes.use('/', verifyToken, insertPassword);
routes.get('/signin', (req, res) => {
    res.render('../views/signin');
})
routes.get('/signup', (req, res) => {
    res.render('../views/signup');
})
routes.post('/signup', (req, res) => {
    const {name, email, password} = req.body;
    const u = new User({
        name: name,
        email: email,
        password: password,
    })
    console.log(u);
    u.save((err) => {
        if(err) {
            console.log(err);
            res.render('../views/signup');
        } else {
            console.log("User saved successfully");
            res.redirect('/signin');
        }
    })
    
})

routes.post('/signin', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email, password: password}, (err) => {
        if(err) {
            console.log("not exist");
        } else {
            // res.redirect('');
            res.redirect('/signup');
        }
    })
})
routes.get('/', (req, res) => {
    res.render('../views/home');
})
module.exports = routes