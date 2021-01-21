const express = require('express');
const router = express.Router();
const verify = require('../../middleware/verify');
const Skill = require('../../models/Skill');
const SkillManager = require('../../services/SkillManager');
const {validate, skillRules} = require('../../services/validationManager');


// @route GET api/skill
// @desc Route for all the skill tags
// @access Public
router.get('/:name', async (req, res) => {

    try {
        
        const name = req.params.name;
        const target = await Skill.findOne({name: name});

        if (!target) {
            return res.status(400).json({errors: [{msg: 'The skill you requested does not exist!'}]});
        }
        res.status(200).json({ressources: target});
        
    } catch (err) {
        return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
    }
});



// @route GET api/skill
// @desc Route for a specific skill tag
// @access Public
router.get('/skill', async (req, res) => {

    try {
        console.log(req);
        res.send('REquest finished');
        
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
router.delete('/update', verify, async (req, res) => {

    try {

        const {id} = req.body;
        const updated = await SkillManager.update({id, name, description, icon});
        if(!updated) {
            return res.status(422).json({errors: [{msg: 'Unprocessable Entity'}]});
        }
        res.status(201).json({ressource: updated});

            
    } catch (err) {
        return res.status(500).json({errors: [{msg: 'The server encountered an Error!'}]});
    }
});


module.exports = router;
