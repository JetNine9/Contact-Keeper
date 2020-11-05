import React from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'

 const home = () => {
    return (
        <div className="grid-2" >
          <div>
           <ContactForm/>
          </div>
          <div>
          <Contacts/>
          </div>
        </div>
    )
}

export default home;
