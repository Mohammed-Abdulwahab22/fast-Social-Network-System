const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type:String,
        required: true,
        unique : true
    },
    email:{
        type:String,
        required : true,
        unique : true 
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type: String,
        default: ''
    },
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendRequests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    date:{
        type: Date,
        default:Date.now(),
    },
});

module.exports = mongoose.model('User',UserSchema);