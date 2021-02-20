const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    registrationRules,
    validate,
} = require('../../services/validationManager.js');

const UserManager = require('../../services/UserManager');

// @route POST api/register
// @desc Route for user registration
// @access Public
router.post('/', registrationRules, validate, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const payload = await UserManager.create({ name, email, password });

        if (!payload) {
            return res.status(400).json({
                errors: [
                    { msg: 'This email is already attached to an account' },
                ],
            });
        }

        const secret = process.env.JWT_SECRET || config.get('jwtSecret');

        jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
            if (err) {
                res.status(500).json({
                    errors: [{ msg: 'The server encountered an Error!' }],
                });
            }
            res.status(201).json({ token });
        });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ errors: [{ msg: 'The server encountered an Error!' }] });
    }
});

module.exports = router;
