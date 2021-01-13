const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next) {
    const tokenHeader = req.header('Authorization');


    if (!tokenHeader) {
        return res.status(401).json({msg: 'Unauthorized to access this URL'});
    }
    const token = tokenHeader.replace("Bearer ", "");
    console.log(token);
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({msg: 'Your token has expired'});
    }
};