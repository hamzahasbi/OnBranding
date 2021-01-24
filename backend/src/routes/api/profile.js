const express = require('express');
const router = express.Router();
const verify = require('../../middleware/verify');
const Profile = require('../../models/Profile');
const {validate, profileRules} = require('../../services/validationManager');

// @route GET api/profile
// @desc Route for the author profile
// @access Private
router.get('/profile', verify, async (req, res) => {

    try {
        const user = req.user.id;
        const profile = await Profile.findOne({user}).populate(
            'user',
            ['name', 'avatar']);

            if (!profile) {
                return res.status(400).json({errors: [{msg: 'Unknown User!'}]});
            }
    } catch (err) {
        console.error(err);
        return res.status(500).json({errors: [{msg: 'The server encoutered an Error!'}]});
    }
});


// @route POST api/profile
// @desc Route to create the author profile
// @access Private
router.post('/profile', verify, profileRules, validate, async (req, res) => {

    try {
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({errors: [{msg: 'The server encountered an Error!'}]});
    }
});

module.exports = router;
