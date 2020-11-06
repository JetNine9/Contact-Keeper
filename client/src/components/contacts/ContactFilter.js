import React, {useContext, useRef, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'


 const ContactFilter = () => {
    const text = useRef('')
    const contactContext = useContext(ContactContext)

    useEffect(() => {
        if (contactContext.filtered === null) {
            text.current.value = ''
        }
    })

    const handleChange = (event) => {
       if (text.current.value !== '') {
           contactContext.filterContacts(event.target.value)
       } else {
        contactContext.clearFilter()
       }
    }

    return (
       <form>
           <input ref={text} type="text" placeholder="Filtered Contacts.." onChange={handleChange} ></input>
       </form>
    )
}

export default ContactFilter;
