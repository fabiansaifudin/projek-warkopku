const express = require('express');
const likeController = require('../controllers/like.controller');

const router = express.Router();

router.get("/:id", likeController.getLikeByComment)
router.post("/like", likeController.likedByComment)
router.delete("/:id/unlike", likeController.unlikeByComment)

module.exports = router