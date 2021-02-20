const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
        },
        avatar: {
            type: String,
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = {
    User: mongoose.model('user', UserSchema),
};
