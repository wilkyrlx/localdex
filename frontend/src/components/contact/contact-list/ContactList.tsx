import { useEffect, useState } from "react"
import ContactListItem from "./ContactListItem"
import Contact from "../../../../../shared/types/Contact"

function ContactList({ setActiveContact, contacts }: { setActiveContact: any, contacts: Contact[] }) {

    return(
        <div>
            <p>Contact list</p>
            <ul>
                { contacts.map((contact) => <ContactListItem contact={contact} setActiveContact={setActiveContact} />) }
            </ul>
        </div>
    )
}

export default ContactList