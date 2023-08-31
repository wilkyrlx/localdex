import { useEffect, useState } from "react"
import ContactListItem from "./ContactListItem"
import Contact from "../../../../../shared/types/Contact"

function ContactList({ setActiveContact }: { setActiveContact : any }) {

    const [contacts, setContacts] = useState<Contact[]>([])

    async function loadData() {
        const response = await fetch(process.env.REACT_APP_BACKEND_URI + '/data')
        const data = await response.json()
        setContacts(data)
    }

    function loadFakeContact() {
        const date = new Date()
        const fakeContact: Contact = {
            _id: "fake-id",
            firstName: "Fake Contact",
            title: "Fake Contact Title",
            alias: [],
            dateAdded: date,
            dateLastUpdated: date
        }
        setContacts([fakeContact, fakeContact, fakeContact, fakeContact, fakeContact, fakeContact, fakeContact, fakeContact, fakeContact, fakeContact, fakeContact, fakeContact, fakeContact, fakeContact, fakeContact])
    }

    useEffect(() => {
        //loadData()
        loadFakeContact()
    }, [])

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