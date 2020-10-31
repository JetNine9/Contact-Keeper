const express = require('express');
const router = express.Router();


// End Point -> api/auth GET REQUEST
// Description - > GET LOGGED IN UER
// ACCESS - > PRIVATE ACCESS
router.get("/", (req, res) => {
    res.send("Get logged in a user")
})


// End Point ->   POST REQUEST api/auth
// Description - > AUTHORIZE USER AND GET TOKEN
// ACCESS - > PUBLIC ACCESS
router.post("/", (req, res) => {
    res.send("LOG IN USER")
})

module.exports = router;
