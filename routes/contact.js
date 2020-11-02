const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require("../model/User")
const Contact = require("../model/Contact")



// End Point ->   GET REQUEST api/contacts
// Description - > GET ALL USER CONTACTS within the specific user
// ACCESS - >      PRIVATE ACCESS
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
        res.json(contacts);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})


// End Point ->   POST REQUEST api/contacts
// Description - > ADD NEW CONTACT unique to each user
// ACCESS - >      PRIVATE ACCESS
router.post("/", [auth, [
    check("name", "please add a name for your new contact").not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req);  // needs routes that accepts data and needs validation
    if (!errors.isEmpty()) { // checks to see if there are any errors
        return res.status(400).json({ errors: errors.array() })
    }

    const {name, email, phone, type} = req.body

    try {

        // CREATE NEW CONTACT FROM THE MODEL
       const newContact = new Contact({
           name: name,
           email: email,
           phone: phone,
           type: type,
           user: req.user.id
       })

       const contact = await newContact.save();
       res.json(contact)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }

})



// End Point ->   PUT REQUEST api/contacts:id
// Description - > UPDATE CONTACT
// ACCESS - >      PRIVATE ACCESS
router.put("/:id",auth, async (req, res) => {

    const {name, email, phone, type} = req.body

    //build contact object if field is submitted
    const contactFields = {}
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;
    console.log(req.params.id)
    console.log(Contact)
    try {
        let contact = await Contact.findById(req.params.id); // finds the contact by :id in the put route
        if (!contact) return res.status(404).json({msg: "Contact not found"})

        //Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "Not authorized"});

        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set: contactFields},
            {new: true});

           res.json(contact)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }

})


// End Point ->   Delete request api/contacts:id
// Description - > delete CONTACT
// ACCESS - >      PRIVATE ACCESS
router.delete("/:id",auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id); // finds the contact by :id in the put route
        if (!contact) return res.status(404).json({msg: "Contact not found"})

        //Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "Not authorized"});

        }

        await Contact.findByIdAndDelete(req.params.id)
        res.json({msg: "Contact Removed"})

    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }

})





module.exports = router;
