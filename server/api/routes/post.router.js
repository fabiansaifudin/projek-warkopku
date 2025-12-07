const express = require('express');
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller')
const likeController = require('../controllers/like.controller')

const router = express.Router()

router.get('/', postController.getAllPost);
router.get('/all', postController.getAllPostByUser);
router.get('/:id', postController.postFind);
router.get('/:user', postController.postByUser);
router.post('/save', postController.postSave);
router.put('/:id/update', postController.postUpdate);
router.delete('/:id', postController.postDelete);

router.get('/:post/comment', commentController.getCommentByPost)
router.get('/:comment/like', likeController.getLikeByComment)
router.get('/:comment/:user/liked', likeController.likedByComment)
router.get('/:comment/:user/dislike', likeController.unlikeByComment)

module.exports = router;