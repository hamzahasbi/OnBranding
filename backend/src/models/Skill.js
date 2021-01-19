const mongoose = require('mongoose');


const SkillSchema = mongoose.Schema({

    'name': {
        type: String,
        unique: true,
        required: true,
    },
    'icon': {
        type: String,
    },
    'description': {
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