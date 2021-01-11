const { check, validationResult } = require('express-validator');

const registrationRules = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please Include a Valid Email').not().isEmpty().isEmail(),
    check('password', 'Password Is not Strong enough!')
    .isLength({min: 6}).notEmpty().isAlphanumeric().isStrongPassword(),
];



const validate = (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(400).json({
      errors: extractedErrors,
    })
  }

  module.exports = {
      registrationRules,
      validate,
  }