const User = require('../models/User');
const { friendsGraph,bfs } = require('../utils/friendsGraph');

const sendFriendRequests = async (req,res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(req.user.id);
        const targetUser = await User.findById(userId);

        if(!targetUser){
            return res.status(404).json({msg:'User not found'});
        }

        if(targetUser.friendRequests.includes(user.id) || targetUser.friends.includes(user.id))
            {
                return res.status(404).json({msg:"Friend request already sent or user already your friend "});

            }

        targetUser.friendRequests.push(user.id);
        await targetUser.save();

       
        res.json({msg:'Friend request sent'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const acceptFriendRequest = async (req,res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(req.user.id);
        const requestingUser = await User.findById(userId);

        if(!requestingUser)
            {
                return res.status(404).json({msg:"User not found"});

            }

        if(!user.friendRequests.includes(requestingUser.id))
            {
                return res.status(400).json({ msg: 'No friend request from this user' });

            }

        user.friends.push(requestingUser.id);
        user.friendRequests = user.friendRequests.filter(id => id.toString() !== requestingUser.id.toString());
        await user.save();
        
        friendsGraph.addNode(user._id.toString());
        friendsGraph.addNode(requestingUser._id.toString());
        friendsGraph.addEdge(user._id.toString(), requestingUser._id.toString());

        requestingUser.friends.push(user.id);
        await requestingUser.save();

        res.json({ msg: 'Friend request accepted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const rejectFriendRequest = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.friendRequests = user.friendRequests.filter(id => id.toString() !== userId.toString());
        await user.save();

        res.json({ msg: 'Friend request rejected' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getFriendsList = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', 'username email profilePicture');
        // const friends = Array.from(friendsGraph.getNeighbors(req.user.id))
        res.json(user.friends);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const searchUsers = async (req, res) => {
    try {
        const { query } = req.body;
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select('username email profilePicture');


        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const searchFriends = async (req, res) => {
    try {
        const userId = req.user.id; 
        const friends = await bfs(userId);
        res.json(friends);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {sendFriendRequests,acceptFriendRequest,rejectFriendRequest,getFriendsList,searchUsers,searchFriends};