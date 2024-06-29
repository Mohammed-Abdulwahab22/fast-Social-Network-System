const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

const usernameUpdate = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        user.username = req.body.username;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const emailUpdate = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);    

        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        user.email = req.body.email;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const passwordUpdate = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { profilePic , usernameUpdate,emailUpdate,passwordUpdate };
