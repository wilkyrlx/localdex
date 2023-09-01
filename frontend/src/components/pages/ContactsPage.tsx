import { useEffect, useState } from "react";
import Contact from "../../../../shared/types/Contact";
import ContactList from "../contact/contact-list/ContactList";
import ContactView from "../contact/contact-view/ContactView";
import apiService from "../../api/apiService";

function ContactsPage() {

    const [activeContact, setActiveContact] = useState<Contact | undefined>(undefined)
    const [contacts, setContacts] = useState<Contact[]>([])
    const [reloadTrigger, setReloadTrigger] = useState<Number>(1);

    async function loadData() {
        const data = await apiService.getData()
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

    // load data on page load
    useEffect(() => {
        loadData()
        //loadFakeContact()
    }, [])
    
    // load data when reloadTrigger changes
    useEffect(() => {
        loadData()
    }, [reloadTrigger])

    return (
        <div className="contact-page-container">
            <div className="scrollable-container" style={{width: "40%", resize: "horizontal"}}>
                <ContactList setActiveContact={setActiveContact} contacts={contacts} />
            </div>
            <div className="scrollable-container" style={{flex: 1}} >
                <ContactView activeContact={activeContact} setReloadTrigger={setReloadTrigger} />
            </div>
        </div>
    );
}

export default ContactsPage;