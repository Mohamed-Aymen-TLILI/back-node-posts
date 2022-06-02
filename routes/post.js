const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');
const commentController = require('../controllers/comment');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes pour les posts
router.post('/', auth.auth, multer, postController.createPost);
router.get('/', auth.auth, postController.getAllPosts);
router.get('/:id', auth.auth, postController.getOnePost);
router.put('/:id', auth.auth, multer, postController.modifyPost);
router.delete('/:id', auth.auth, postController.deletePost);
router.delete('/admin/:id', auth.authAdmin, postController.deletePostByAdmin);

// Routes pour les commentaires
router.post('/:postId/comments', auth.auth, commentController.createComment);
router.get('/:postId/comments', auth.auth, commentController.getAllComments);
router.get('/:postId/comments/:id', auth.auth, commentController.getOneComment);
router.put('/:postId/comments/:id', auth.auth, commentController.modifyComment);
router.delete('/:postId/comments/:id', auth.authAdmin, commentController.deleteComment);
router.delete('/admin/:postId/comments/:id', auth.authAdmin, commentController.deleteCommentByAdmin);

module.exports = router;