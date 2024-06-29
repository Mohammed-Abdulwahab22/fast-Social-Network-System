const User = require('../models/User');

const profilePic = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        user.profilePicture = req.body.profilePicture;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { profilePic };
