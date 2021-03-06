import react from 'react';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types'

const contactReducer = (state, action) => { // state is the variable passed in from the UseReducer initialization
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            }
            case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((contact) =>  contact._id !== action.payload
                )
            };
            case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
            case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
            case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact)
            }
            case FILTER_CONTACTS:
                return {
                    ...state,
                    filtered: state.contacts.filter((contact) => {
                        const regex = new RegExp(`${action.payload}`, 'gi'); // gi so it is case incencitive
                        return contact.name.match(regex) || contact.email.match(regex) // will return anything that matches the name thats passed in
                    })
                }
            case CLEAR_FILTER:
                return {
                    ...state,
                    filtered: null
                }
            case CONTACT_ERROR:
                return {
                    ...state,
                    error: action.payload
                }

            case GET_CONTACTS:

                return {
                    ...state,
                    contacts: action.payload,

                }

            case CLEAR_CONTACTS:
                return {
                    ...state,
                    contacts: null,
                    filtered: null,
                    error: null,
                    current: null
                }

        default:
            return state;
    }
}


export default contactReducer
