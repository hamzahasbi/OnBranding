const express = require('express');
const router = express.Router();
const {User} = require('../../models/User');
const { loginRules, validate } = require('../../services/validationManager.js');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');


// @route POST api/login
// @desc Route for user Login
// @access Public
router.post('/', loginRules, validate, async(req, res) => {
    const {email, password} = req.body;
    const salt = await bcrypt.genSalt(14);

    let user = await User.findOne({email});

    if (!user) {
        return res.status(401).json({errors: [{msg: 'Invalid Credentials'}]} );
    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(401).json({errors: [{msg: 'Invalid Credentials'}]} );
    }
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
});

module.exports = router;
