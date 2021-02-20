const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        intro: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'skill',
            },
        ],
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = {
    Post: mongoose.model('post', PostSchema),
};
