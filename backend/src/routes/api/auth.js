const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../../models/User');
const { loginRules, validate } = require('../../services/validationManager.js');
const { validatePassword } = require('../../services/PasswordManager');

// @route POST api/login
// @desc Route for user Login
// @access Public

router.post('/', loginRules, validate, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    const isValid = validatePassword(user.password, password, user.salt);

    if (!isValid) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };
    const secret = process.env.JWT_SECRET || config.get('jwtSecret');

    jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ errors: [{ msg: 'The server encountered an Error!' }] });
  }
});

module.exports = router;
