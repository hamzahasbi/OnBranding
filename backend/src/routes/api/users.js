const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

// @route POST api/register
// @desc Route for user registration
// @access Public
router.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = router;
