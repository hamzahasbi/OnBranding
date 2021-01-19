const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req, res, next) {
    const tokenHeader = req.header('Authorization');


    if (!tokenHeader) {
        return res.status(401).json({msg: 'Unauthorized to access this URL'});
    }
    const regEx = new RegExp('Bearer ', "ig");
    const token = tokenHeader.replace(regEx, "");
    
    const secret = process.env.JWT_SECRET || config.get('jwtSecret');
    try {
        const decoded = jwt.verify(token, secret);

        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({msg: 'Your token has expired'});
    }
};