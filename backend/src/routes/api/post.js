const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verify = require('../../middleware/verify');
const {Post} = require('../../models/Post');
const PostManager = require('../../services/PostManager');
const {validate, postRules} = require('../../services/validationManager');



// @route GET api/post
// @desc Route for a specific skill tag
// @access Private
router.get('/', verify, async (req, res) => {

    try {


        const {limit, offset} = req.query;
        const user = mongoose.Types.ObjectId(req.user.id);
        const all = await PostManager.getAll(user, limit, offset);
        
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


// @route GET api/post
// @desc Route for a specific skill tag
// @access Public
router.get('/list', async (req, res) => {

    try {


        const {email, limit, offset} = req.query;
        const all = await PostManager.getAll({email}, limit, offset);
        
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

// @route POST api/post/add
// @desc Route to create the author profile
// @access Private
router.post('/add', postRules, validate, verify, async (req, res) => {

    try {

        const {name, intro, link, tags} = req.body;
        const user = req.user;
        const created = await(PostManager.create({name, intro, link, tags, user}));
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
router.patch('/update', postRules, validate, verify, async (req, res) => {

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
