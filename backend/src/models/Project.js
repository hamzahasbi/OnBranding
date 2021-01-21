const mongoose = require('mongoose');


const ProjectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    intro: {
        type: String,
        required: true
    },
    link: {
        type: String,
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'skill',
        }
    ],
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = {
    Project: mongoose.model('project', ProjectSchema)
}