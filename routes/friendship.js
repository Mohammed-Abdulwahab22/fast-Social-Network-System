const express = require('express');
const auth = require('../middleware/authMiddleware');
const { sendFriendRequests , acceptFriendRequest, rejectFriendRequest, getFriendsList, searchUsers } = require('../controllers/friendshipController');

const router = express.Router();

router.post('/sendFriendRequest', auth, sendFriendRequests);
router.post('/acceptFriendRequest', auth, acceptFriendRequest);
router.post('/rejectFriendRequest', auth, rejectFriendRequest);
router.get('/friendsList', auth, getFriendsList);
router.post('/searchUsers', auth, searchUsers);

module.exports = router;
