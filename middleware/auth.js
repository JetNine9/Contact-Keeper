// middleware will be a function that has access to the request and response cycle.
const jwt = require('jsonwebtoken')
const config = require("config");


// middleware function below
module.exports = function(req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    // check if token does not exist
    if (!token) {
        return res.status(401).json({msg: "no token, authorization denied"});
    }

    // Code below verifies the token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user
        next();
    } catch (error) {
        res.status(401).json({msg: "Token is not valid"})

    }
}
