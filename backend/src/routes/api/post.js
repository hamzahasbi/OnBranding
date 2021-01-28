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


        const {limit, tags, offset, sort, post} = req.query;
        const user = mongoose.Types.ObjectId(req.user.id);
            
        const all = await PostManager.get(user, {tags, id: post}, sort, limit, offset);
        
        if (!all) {
            return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
        }

        
        res.status(200).json({
            ...all
        })
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
    }
});


// @route GET api/post
// @desc Route for a specific skill tag
// @access Public
router.get('/list', async (req, res) => {

    try {


        const {email, tags, limit, offset, sort, post} = req.query;

        const all = await PostManager.get({email}, {tags, id: post}, sort, limit, offset);
        
        if (!all) {
            return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
        }

        res.status(200).json({
            ...all
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
    }
});

// @route POST api/post/add
// @desc Route to create the author profile
// @access Private
router.post('/add', postRules, validate, verify, async (req, res) => {

    try {

        const {name, intro, link, tags, thumbnail} = req.body;
        const user = req.user;
        const created = await(PostManager.create({name, intro, link, tags, user, thumbnail}));
        if(!created) {
            return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
        }
        res.status(201).json({ressource: created});

            
    } catch (err) {
        console.log(err);
        return res.status(500).json({errors: [{msg: 'The server encountered an Error!'}]});
    }
});

// @route PATCH api/post/update
// @desc Route to create the author profile
// @access Private
router.patch('/update', validate, verify, async (req, res) => {

    try {

        const {id, name, intro, tags, link, thumbnail} = req.body;
        const updated = await SkillManager.update({id, name, intro, tags, link, thumbnail});
        if(!updated) {
            return res.status(422).json({errors: [{msg: 'Unprocessable Entity'}]});
        }
        res.status(201).json({ressource: updated});

            
    } catch (err) {
        return res.status(500).json({errors: [{msg: 'The server encountered an Error!'}]});
    }
});


// @route DELETE api/post/remove
// @desc Route to create the author profile
// @access Private
router.delete('/remove', verify, async (req, res) => {

    try {

        const {id} = req.body;
        const removed = await PostManager.remove({id});
        if(!removed) {
            return res.status(422).json({errors: [{msg: 'Unprocessable Entity'}]});
        }
        res.status(200).json({ressource: removed});

            
    } catch (err) {
        return res.status(500).json({errors: [{msg: 'The server encountered an Error!'}]});
    }
});


module.exports = router;
