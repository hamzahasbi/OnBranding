const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verify = require('../../middleware/verify');
const {Project} = require('../../models/Project');
const ProjectManager = require('../../services/ProjectManager');
const {validate, postRules} = require('../../services/validationManager');



// @route GET api/project
// @desc Route for a specific skill tag
// @access Private
router.get('/', verify, async (req, res) => {

    try {


        const {limit, tags, offset, sort, project} = req.query;
        const user = mongoose.Types.ObjectId(req.user.id);
            
        const all = await ProjectManager.get(user, {tags, id: project}, sort, limit, offset);
        
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


// @route GET api/project/list
// @desc Route for a specific skill tag
// @access Public
router.get('/list', async (req, res) => {

    try {


        const {email, tags, limit, offset, sort, project} = req.query;

        const all = await ProjectManager.get({email}, {tags, id: project}, sort, limit, offset);
        
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

// @route POST api/project/add
// @desc Route to create the author profile
// @access Private
router.post('/add', postRules, validate, verify, async (req, res) => {

    try {

        const {name, intro, link, tags, thumbnail} = req.body;
        const user = req.user;
        const created = await(ProjectManager.create({name, intro, link, tags, user, thumbnail}));
        if(!created) {
            return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
        }
        res.status(201).json({ressource: created});

            
    } catch (err) {
        console.log(err);
        return res.status(500).json({errors: [{msg: 'The server encountered an Error!'}]});
    }
});

// @route PATCH api/project/update
// @desc Route to create the author profile
// @access Private
router.patch('/update', validate, verify, async (req, res) => {

    try {

        const {id, name, intro, tags, link, thumbnail} = req.body;
        const updated = await ProjectManager.update({id, name, intro, tags, link, thumbnail});
        if(!updated) {
            return res.status(422).json({errors: [{msg: 'Unprocessable Entity'}]});
        }
        res.status(201).json({ressource: updated});

            
    } catch (err) {
        return res.status(500).json({errors: [{msg: 'The server encountered an Error!'}]});
    }
});


// @route DELETE api/project/remove
// @desc Route to create the author profile
// @access Private
router.delete('/remove', verify, async (req, res) => {

    try {

        const {id} = req.body;
        const removed = await ProjectManager.remove({id});
        if(!removed) {
            return res.status(422).json({errors: [{msg: 'Unprocessable Entity'}]});
        }
        res.status(200).json({ressource: removed});

            
    } catch (err) {
        return res.status(500).json({errors: [{msg: 'The server encountered an Error!'}]});
    }
});


module.exports = router;
