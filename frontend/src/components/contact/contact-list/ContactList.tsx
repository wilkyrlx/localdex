import { useEffect, useState } from "react"
import ContactListItem from "./ContactListItem"
import Contact from "../../../../../shared/types/Contact"

function ContactList() {

    const [contacts, setContacts] = useState<Contact[]>([])

    async function loadData() {
        const response = await fetch(process.env.REACT_APP_BACKEND_URI + '/data')
        const data = await response.json()
        setContacts(data)
    }

    useEffect(() => {
        loadData()
    }, [])

    return(
        <div>
            <p>Contact list</p>
            <ul>
                { contacts.map((contact) => <ContactListItem contact={contact} />) }
            </ul>
        </div>
    )
}

export default ContactList