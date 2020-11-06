import React, {useContext} from 'react'
import Proptypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext'


 const ContactItem = (props) => {

    const contactContext = useContext(ContactContext);


    const {type} = props.contact

    const onDelete = () => {
        contactContext.deleteContact(props.contact.id)
        contactContext.clearCurrent()
    }

    const onEdit = () => {
        contactContext.setCurrent(props.contact)
    }

    return (
        <div className='card bg-light'>
            <h3 className="text-primary text-left" >
                {props.contact.name}{' '}
                <span
                style={{float: "right"}}
                className={'badge ' + (props.contact.type === "professional" ? "badge-sucess" : "badge-primary")}>
                    {type.charAt(0).toUpperCase() + type.slice(1, type.length)}
                </span>
            </h3>
            <ul>
                {props.contact.email && <li>
                    <i className="fas fa-envelope-open" ></i> {props.contact.email}
                </li>}
                {props.contact.phone && <li>
                    <i className="fas fa-envelope-open" ></i> {props.contact.phone}
                </li>}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={onEdit} >EDIT</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete} >DELETE</button>
            </p>
        </div>
    )
}

ContactItem.prototypes = {
    contact: Proptypes.object.isRequired
}

export default ContactItem
