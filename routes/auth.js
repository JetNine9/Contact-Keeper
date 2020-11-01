const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config')
const {check, validationResult} = require('express-validator')


// End Point -> api/auth GET REQUEST
// Description - > GET LOGGED IN UER
// ACCESS - > PRIVATE ACCESS
router.get("/",
[
    check("email", "please include valid email").isEmail(),
    check("password", "please include a password").exists()
],
async (req, res) => {
    const errors = validationResult();
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({msg: "Invalid Credentials"})
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password); // bcrypt method to check if the password is correct

        if (!isPasswordMatching) {
            return res.status(400).json({msg: "invalid password"})
        }

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
        res.status(500).send("server error")
    }
})


// End Point ->   POST REQUEST api/auth
// Description - > AUTHORIZE USER AND GET TOKEN
// ACCESS - > PUBLIC ACCESS
router.post("/", (req, res) => {
    res.send("LOG IN USER")
})

module.exports = router;
