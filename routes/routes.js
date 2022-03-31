const express = require('express')
const router = express.Router()

const {
    insertPassword,
    deletePassword,
    updatePassword,
    deleteAllPasswords,
    getAllPasswords,
} = require('../controllers/pasword.controller.js');

const {
    setMasterKey
} = require('../controllers/user.controller.js');

// const {
//     signin,
//     verfiy
// } = require('../conrollers/auth')

// router.route('/').get(getAllTasks).post(createTask)
// router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router