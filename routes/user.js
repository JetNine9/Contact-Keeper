const express = require('express');
const router = express.Router();
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
 (req, res) => {
    const errors = validationResult(req);  // needs routes that accepts data and needs validation
    if (!errors.isEmpty()) { // checks to see if there are any errors
        return res.status(400).json({errors: errors.array() })
    }
    res.send("passed")
 }
)

module.exports = router;
