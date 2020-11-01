const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('config')
const User = require("../model/User")
const {check, validationResult} = require('express-validator')


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
router.get("/", (req, res) => {
    res.send("GET LOGGED IN USER")
})

module.exports = router;
