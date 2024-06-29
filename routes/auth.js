const express = require('express');
const { register, login } = require('../controllers/authController');
const { profilePic, usernameUpdate, emailUpdate, passwordUpdate } = require('../controllers/profileManagmentController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/profilePic', auth, profilePic);
router.post('/usernameUpdate', auth, usernameUpdate);
router.post('/emailUpdate', auth, emailUpdate);
router.post('/passwordUpdate', auth, passwordUpdate);

module.exports = router;
