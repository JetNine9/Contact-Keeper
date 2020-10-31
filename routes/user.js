const express = require('express');
const router = express.Router();


// End Point -> api/users. POST REQUEST
// Description - > register a user
// ACCESS - > PUBLIC ACCESS
router.post("/", (req, res) => {
    res.send("registers a user")
})

module.exports = router;
