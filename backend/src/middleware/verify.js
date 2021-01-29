const jwt = require('jsonwebtoken');
const config = require('config');

function verification(req, res, next) {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'Your token has expired' }] });
  }
  const regEx = new RegExp('Bearer ', 'ig');
  const token = tokenHeader.replace(regEx, '');

  const secret = process.env.JWT_SECRET || config.get('jwtSecret');
  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;
    return next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'Your token has expired' }] });
  }
}

module.exports = verification;
