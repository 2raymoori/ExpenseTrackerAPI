const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fName:{
        type:String,
        required:true
    },
    profileImg:{
        type:String,
        default:"avatar"
    },
    lName:{
        type:String,
        required:true
    },
    password:{
        type:String, 
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('users',Schema);