import { useEffect, useState } from "react"
import ContactListItem from "./ContactListItem"
import Contact from "../../../../../shared/types/Contact"

function ContactList({ setActiveContact, contacts }: { setActiveContact: any, contacts: Contact[] }) {

    return(
        <div>
            <ul>
                { contacts.map((contact) => <ContactListItem contact={contact} setActiveContact={setActiveContact} key={contact._id}/>) }
            </ul>
        </div>
    )
}

export default ContactList