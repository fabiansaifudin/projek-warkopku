const express = require('express');
const mediaController = require('../controllers/media.controller');
const { imageUpload } = require('../settings/system');

const router = express.Router()

router.post('/upload-galery', imageUpload.single('galery'), mediaController.avatar)
router.delete('/remove-image/:id', mediaController.deleteAvatar)

module.exports = router