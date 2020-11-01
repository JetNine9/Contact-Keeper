const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const config = require('config')
const User = require("../model/User")
const {check, validationResult} = require('express-validator');
const { findById } = require('../model/User');


// End Point ->   POST REQUEST api/auth
// Description - > AUTHORIZE USER AND GET TOKEN
// ACCESS - > PUBLIC ACCESS
router.post("/",
[
    check("email", "please include valid email").isEmail(),
    check("password", "please include a password").exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }

    const {email, password} = req.body;

    try {
        /////////////// Section below checks if the user is in the database //////////////////////

        let user = await User.findOne({email});
        // if the users email does not exist the code below runs
        if (!user) {
            return res.status(400).json({msg: "Invalid Credentials"})
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password); // bcrypt method to check if the password is correct

        // if the users password does not exist the code below runs
        if (!isPasswordMatching) {
            return res.status(400).json({msg: "invalid password"})
        }

        //////////////////////// ESTABLISHING JSON WEB TOKEN BELOW ///////////////////////////////////

        const payload = { // sending the user.id to the payload
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err;
            res.json({token}); // this gives us back an object with a token
        })


    } catch (error) {
        console.error(error.message)

        res.status(500).send("server error" )
    }
})




// End Point -> api/auth GET REQUEST
// Description - > GET LOGGED IN UER
// ACCESS - > PRIVATE ACCESS
// to protect this route I will pass in the middleware function as a second parameter.
router.get("/", auth, async (req, res) => {
    try {
        // req object should have a user object attached to it with the currents users login id
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router;
