const { check, validationResult } = require('express-validator');

const registrationRules = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please Include a Valid Email').not().isEmpty().isEmail(),
    check('password', 'This Password Is not Strong enough!')
    .isLength({min: 6}).notEmpty().isAlphanumeric(),
];


const loginRules = [
  check('email', 'Please Include a Valid Email').not().isEmpty().isEmail(),
  check('password', 'Password is required').notEmpty(),
];

const profileRules = [
  check('status', 'Status is required').notEmpty(),
  check('location', 'Location is required').notEmpty(),
  check('bio', 'Bio is required').notEmpty(),
  check('skills', 'Skills are required').notEmpty(),
  check('interest', 'Interest is required').notEmpty(),
];

const skillRules = [
  check('name', 'Name is required').notEmpty(),
];


const postRules = [
  check('name', 'Name is required').notEmpty(),
  check('intro', 'Introduction is required and must be >= 120 and <= 400 chars').notEmpty().isLength({ min: 120, max:400 }),
  check('link', 'A valid Link is required').notEmpty().isURL(),
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


module.exports = {
  loginRules,
  registrationRules,
  profileRules,
  skillRules,
  postRules,
  validate,
}