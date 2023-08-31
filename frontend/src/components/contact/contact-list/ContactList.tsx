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
        const Crockett: Contact = {
            _id: "64f02a80c59c53b737285ac4",
            firstName: "James",
            lastName: "Crockett",
            title: "Detective",
            alias: [],
            dateAdded: date,
            dateLastUpdated: date
        }
        const Tubbs: Contact = {
            _id: "fake-id2",
            firstName: "Ricardo",
            lastName: "Tubbs",
            title: "Detective",
            alias: [],
            dateAdded: date,
            dateLastUpdated: date
        }
        setContacts([Crockett, Tubbs])
    }

    useEffect(() => {
        loadData()
        //loadFakeContact()
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