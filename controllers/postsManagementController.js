const Post  = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const newPost = new Post({
            text: req.body.text,
            name: user.username,
            avatar: user.profilePicture,
            user: req.user.id
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.body.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await post.deleteOne();
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.body.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const commentPost = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.body.id);
        const newComment = {
            text: req.body.text,
            name: user.username,
            avatar: user.profilePicture,
            user: req.user.id
        };
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


module.exports = { createPost, getPosts, deletePost, likePost, commentPost };