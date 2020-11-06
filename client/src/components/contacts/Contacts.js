import React, { useContext, Fragment } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered } = contactContext;

    if (contacts.length === 0) {
        return <h4>please add a contact</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {/* // did a ternary operator below */}
                {filtered !== null ? filtered.map((contact) => {
                    return (
                        <CSSTransition key={contact.id} timeout={400} classNames="item"  >
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    )
                }) :
                    contacts.map((contact) => {
                        return (
                            <CSSTransition key={contact.id} timeout={400} classNames="item" >
                                <ContactItem  contact={contact} />
                            </CSSTransition>
                        )
                    })}


            </TransitionGroup>
        </Fragment>

    );
}

export default Contacts;
