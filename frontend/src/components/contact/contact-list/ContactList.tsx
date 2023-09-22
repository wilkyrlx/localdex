import { useEffect, useState } from "react"
import ContactListItem from "./ContactListItem"
import Contact from "../../../../../shared/types/Contact"

function ContactList({ setActiveContact, contacts, setReloadTrigger }: { setActiveContact: any, contacts: Contact[], setReloadTrigger: any }) {

    return(
        <div>
            <ul>
                { contacts.map((contact) => <ContactListItem contact={contact} setActiveContact={setActiveContact} setReloadTrigger={setReloadTrigger} key={contact._id}/>) }
            </ul>
        </div>
    )
}

export default ContactList