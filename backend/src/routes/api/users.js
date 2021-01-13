const express = require('express');
const router = express.Router();
const { registrationRules, validate } = require('../../services/validationManager.js');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');


const {User} = require('../../models/User');




// @route POST api/register
// @desc Route for user registration
// @access Public
router.post('/', registrationRules, validate, async (req, res) => {
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({errors: [{msg: 'This email is already attached to an account'}]} );
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password,
        });

        const salt = await bcrypt.genSalt(14);

        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id,
            }
        };
        jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 36000},
        (err, token) => {
            if (err) throw err;
            res.json({token});
        });

    } catch (exception) {
        console.error(exception);
        res.status(500).send('An error occured');
    }
});

module.exports = router;
