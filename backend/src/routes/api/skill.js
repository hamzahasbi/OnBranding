const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verify = require('../../middleware/verify');
const {Skill} = require('../../models/Skill');
const SkillManager = require('../../services/SkillManager');
const {validate, skillRules} = require('../../services/validationManager');


// @route GET api/skill
// @desc Route for all the skill tags
// @access Public
router.get('/:id', async (req, res) => {

    try {
        
        const id = mongoose.Types.ObjectId(req.params.id);
        const target = await Skill.findById(id).exec();
        if (!target) {
            return res.status(400).json({errors: [{msg: 'The skill you requested does not exist!'}]});
        }
        res.status(200).json({ressource: target});
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
    }
});



// @route GET api/skill
// @desc Route for a specific skill tag
// @access Public
router.get('/', async (req, res) => {

    try {
        const all = await SkillManager.getAll();
        
        if (!all) {
            return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
        }

        
        res.status(200).json({
            ressource: all,
        })
        
    } catch (err) {
        return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
    }
});


// @route POST api/skill
// @desc Route to create the author profile
// @access Private
router.post('/add', skillRules, validate, verify, async (req, res) => {

    try {

        const {name, description, icon} = req.body;
        const created = await(SkillManager.create({name, description, icon}));
        if(!created) {
            return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
        }
        res.status(201).json({ressource: created});

            
    } catch (err) {
        console.log(err);
        return res.status(500).json({errors: [{msg: 'The server encountered an Error!'}]});
    }
});

// @route PATCH api/skill
// @desc Route to create the author profile
// @access Private
router.patch('/update', skillRules, validate, verify, async (req, res) => {

    try {

        const {id, name, description, icon} = req.body;
        const updated = await SkillManager.update({id, name, description, icon});
        if(!updated) {
            return res.status(422).json({errors: [{msg: 'Unprocessable Entity'}]});
        }
        res.status(201).json({ressource: updated});

            
    } catch (err) {
        return res.status(500).json({errors: [{msg: 'The server encountered an Error!'}]});
    }
});


// @route DELETE api/skill
// @desc Route to create the author profile
// @access Private
router.delete('/remove', verify, async (req, res) => {

    try {

        const {id} = req.body;
        const removed = await SkillManager.removebyId({id});
        if(!removed) {
            return res.status(422).json({errors: [{msg: 'Unprocessable Entity'}]});
        }
        res.status(200).json({ressource: removed});

            
    } catch (err) {
        return res.status(500).json({errors: [{msg: 'The server encountered an Error!'}]});
    }
});


module.exports = router;
