import React, { useReducer } from 'react';
import  {v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'


// set initial state
const ContactState = (props) => {



    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Lebron James",
                email: "Lebron@goat.com",
                phone: "111-111-111",
                type: "Personal"
            },
            {
                id: 2,
                name: "Bronny James",
                email: "Bronny@goat.com",
                phone: "222-111-111",
                type: "Personal"
            },
            {
                id: 3,
                name: "Bryce James",
                email: "Bryce@goat.com",
                phone: "333-111-111",
                type: "Personal"
            }
        ]
    };
    // state gives us access to state, dispatch lets us dispatch objects to reducer
    const [state, dispatch] = useReducer(contactReducer, initialState)

    // Add Contact
    const addContact = (contact) => {
        contact.id = uuidv4(); // this is adding a new id from uuid
        dispatch({type: ADD_CONTACT, payload: contact})
    }
    // Delete Contact

    const deleteContact = (id) => {
        dispatch({type: DELETE_CONTACT, payload: id})
    }


    //Set Current Contact

    // Clear Current Contact

    //Update Contact

    // Filter Contacts

    // Clear Filter

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact,
                deleteContact
            }}
        >

            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
