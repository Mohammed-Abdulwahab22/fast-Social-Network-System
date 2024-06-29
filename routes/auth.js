const express = require('express');
const { register, login } = require('../controllers/authController');
const { profilePic } = require('../controllers/profileManagmentController');

const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/profilePic', auth, profilePic);

module.exports = router;
