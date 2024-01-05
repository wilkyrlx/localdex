import { useEffect, useState } from "react"
import ContactListItem from "./ContactListItem"
import Contact from "../../../types/Contact"

function ContactList({ activeContact, setActiveContact, contacts }: { activeContact: Contact, setActiveContact: any, contacts: Contact[] }) {

    return (
        <div>
            <ul>
                {contacts.map((contact) =>
                    <ContactListItem
                        activeContact={activeContact}
                        contact={contact}
                        setActiveContact={setActiveContact}
                        key={contact._id} />
                )}
            </ul>
        </div>
    )
}

export default ContactList