const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    websites: [
        {
            twitter: {
                type: String
            },
            kattis: {
                type: String
            },
            github: {
                type: String
            },
            coffee: {
                type: String
            },
            dev: {
                type: String
            },
            medium: {
                type: String
            },
            codeforeces: {
                type: String
            },
            other: {
                type: [String]
            }
        }
    ],
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skill',
        required: true,
    }],
    bio: {
        type: String,
        required: true
    },
    interest: {
        type: String,
        required: true
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    profiltags: {
        type: [String],
    },
    resume: {
        type: String,
    }


}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = {
    Profile : mongoose.model('profile', ProfileSchema),
};