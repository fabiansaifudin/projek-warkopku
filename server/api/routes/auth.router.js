const authController = require('../controllers/auth.controller');

const express = require('express');
const router = express.Router()

router.get('/', function(req, res) {
    return res.render('reset', { status: [202] })
})
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/resetPassword', authController.resetPassword)
router.get('/resetPassword/:id/:token', authController.checkResetPassword)
router.post('/resetPassword/:id/:token', authController.changeResetPassword)

module.exports = router