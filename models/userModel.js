const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    displayName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        requires: false
    }
}, { strict: false })

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;
