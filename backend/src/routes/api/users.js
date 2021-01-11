const express = require('express');
const router = express.Router();
const { registrationRules, validate } = require('../../services/validationManager.js')


// @route POST api/register
// @desc Route for user registration
// @access Public
router.post('/', registrationRules, validate, (req, res) => {
    res.send('Registation DONE');
});

module.exports = router;
