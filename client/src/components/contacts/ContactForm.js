import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'


export const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    //useEffect -> uses current object and sets it to current contact form if the object is not null
    useEffect(() => {
        if (contactContext.current !== null) {
            Setcontact(contactContext.current)
        } else {
            Setcontact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, contactContext.contact])



    const [contact, Setcontact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });



    //pull out value from contact
    const { name, email, phone, type } = contact

    const onChange = (event) => {
        Setcontact({
            ...contact,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (contactContext.current === null) {
            contactContext.addContact(contact);
        } else {
            contactContext.updateContact(contact)
        }

        clearAll();
    }

    // clears current contact
    const clearAll = () => {
        contactContext.clearCurrent()
    }


    return (
        <div>

            <form onSubmit={onSubmit}>
                <h2 className="text-primary" >{contactContext.current ? 'Edit Contact' : 'Add Contact'}</h2>
                <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required ></input>
                <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required ></input>
                <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} ></input>
                <h5>Contact Type</h5>
                <input type="radio" name="type" value="personal" checked={type === "personal"} onChange={onChange} ></input> Personal{' '}
                <input type="radio" name="type" value="professional" checked={type === "professional"} onChange={onChange} ></input> Professional{' '}
                <div>
                    <input type="submit" value={contactContext.current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" ></input>
                </div>
                {contactContext.current && <div
                >
                    <button className="btn btn-light btn-block" value="clear" onClick={clearAll} >Clear </button>
                </div>}
            </form>

        </div>
    )
}

export default ContactForm;
