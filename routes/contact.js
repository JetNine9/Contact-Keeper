const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator')

const User = require("../model/User")
const Contact = require("../model/Contact")



// End Point ->   GET REQUEST api/contacts
// Description - > GET ALL USER CONTACTS
// ACCESS - >      PRIVATE ACCESS
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1})
        res.json(contacts);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
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
