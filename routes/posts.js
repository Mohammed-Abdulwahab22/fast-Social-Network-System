const express = require('express');
const auth = require('../middleware/authMiddleware');
const { createPost, getPosts, deletePost, likePost, commentPost } = require('../controllers/postsManagementController');
const router = express.Router();

router.post('/createPost', auth, createPost);
router.get('/getPosts', getPosts);
router.post('/deletePost', auth, deletePost);
router.post('/likePost', auth, likePost);
router.post('/commentPost', auth, commentPost);

module.exports = router;