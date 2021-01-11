const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: Text,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = User = mongoose.model(UserSchema);