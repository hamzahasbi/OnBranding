const mongoose = require('mongoose');


const SkillSchema = mongoose.Schema({

    'name': {
        type: String,
        required: true,
    },
    'icon': {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = {
    Skill: mongoose.model('skill', SkillSchema)
}