const { check, validationResult } = require('express-validator');

const registrationRules = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please Include a Valid Email').not().isEmpty().isEmail(),
    check('password', 'This Password Is not Strong enough!')
    .isLength({min: 6}).notEmpty().isAlphanumeric(),
];



const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(400).json({
      errors: extractedErrors,
    })
};


const loginRules = [
  check('email', 'Please Include a Valid Email').not().isEmpty().isEmail(),
  check('password', 'Password is required').notEmpty(),
];
module.exports = {
  loginRules,
  registrationRules,
  validate,
}