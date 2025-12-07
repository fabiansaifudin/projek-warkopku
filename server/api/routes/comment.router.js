const express = require('express');
const commentController = require('../controllers/comment.controller');

const router = express.Router()

router.get("/", commentController.getCommentByPost);
router.get("/:id", commentController.commentFind);
router.post("/save", commentController.commentSave);
router.put("/:id/update", commentController.commentUpdate);
router.delete("/:id", commentController.commentDelete);

module.exports = router