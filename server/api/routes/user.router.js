const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const { imageUpload } = require('../settings/system');

const router = express.Router()

// router.get('/check-auth', auth.authenticateToken, userController.checkAuth)
router.get('/profile', auth.authenticateToken, userController.profile)
router.put('/update/:id', auth.authenticateToken, userController.update)
router.post('/:id/upload-avatar', imageUpload.single('avatar'), userController.avatar)
router.delete('/remove-avatar/:id', userController.deleteAvatar)

module.exports = router