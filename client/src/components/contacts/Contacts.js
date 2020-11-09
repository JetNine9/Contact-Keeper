import React, { useContext, Fragment, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts } = contactContext;

    useEffect(() => {
        getContacts()
        //eslint-disable-next-line
    },[])




    if (contacts !== null && contacts.length === 0) {
        return <h4>please add a contact</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {/* // did a ternary operator below */}
                {filtered !== null && contacts !== null ? filtered.map((contact) => {
                    return (
                        <CSSTransition key={contact.id} timeout={400} classNames="item"  >
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    )
                }) :
                   contacts !== null && contacts.map((contact) => {
                        return (
                            <CSSTransition key={contact._id} timeout={400} classNames="item" >
                                <ContactItem  contact={contact} />
                            </CSSTransition>
                        )
                    })}


            </TransitionGroup>
        </Fragment>

    );
}

export default Contacts;
