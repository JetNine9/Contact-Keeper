const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../model/User")
const {check, validationResult} = require('express-validator')
//


// End Point -> api/users. POST REQUEST
// Description - > register a user
// ACCESS - > PUBLIC ACCESS
router.post("/",
[
    check("name", "Please add name")
    .not()
    .isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check('password', "please enter a password with six or more charachters").isLength({min: 6})
],
 async (req, res) => {
    const errors = validationResult(req);  // needs routes that accepts data and needs validation
    if (!errors.isEmpty()) { // checks to see if there are any errors
        return res.status(400).json({errors: errors.array() })
    }

    const {name, email, password} = req.body; // deconstructing from the JSON object that will contain the name, email and password



    try {
        let user = await User.findOne({email: email}) // findOne comes from mongoose. Looks for a user with email (line 25)

        if (user) {
        return res.status(400).json({msg: "User already exist"});
        }

        // Below we are using user model to create a new user. Check model folder for reference.
        user = new User({
            name: name,
            email: email,
            password: password
        });

        // encrypting password below
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt) // takes the plain text password and the salt.

        // save to database
        await user.save();

        res.send("User saved");

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
 }
)

module.exports = router;
