const express = require('express');
const router = express.Router();



// End Point ->   GET REQUEST api/contacts
// Description - > GET ALL USER CONTACTS
// ACCESS - >      PRIVATE ACCESS
router.get("/", (req, res) => {
    res.send("Get ALL in a CONTACTS")
})


// End Point ->   POST REQUEST api/contacts
// Description - > ADD NEW CONTACT
// ACCESS - >      PRIVATE ACCESS
router.post("/", (req, res) => {
    res.send("ADD A CONTACT")
})



// End Point ->   PUT REQUEST api/contacts:id
// Description - > UPDATE CONTACT
// ACCESS - >      PRIVATE ACCESS
router.put("/:id", (req, res) => {
    res.send("UPDATE A CONTACT")
})


// End Point ->   Delete request api/contacts:id
// Description - > delete CONTACT
// ACCESS - >      PRIVATE ACCESS
router.delete("/:id", (req, res) => {
    res.send("UPDATE A CONTACT")
})





module.exports = router;
