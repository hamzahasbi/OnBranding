const express = require('express');
const router = express.Router();
const { registrationRules, validate } = require('../../services/validationManager.js');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');


const {User} = require('../../models/User');
const {create} = require('../../services/UserManager');



// @route POST api/register
// @desc Route for user registration
// @access Public
router.post('/', registrationRules, validate, async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const payload = await create({name, email, password});
        if (!payload) {
            return res.status(400).json({errors: [{msg: 'This email is already attached to an account'}]} )
        }
        jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 36000},
        (err, token) => {
            if (err) res.status(500).send('An error occured');
            res.status(201).json({token});
        });

    } catch (exception) {
        console.error(exception);
        res.status(500).send('An error occured');
    }
});

module.exports = router;
