import { useEffect, useState } from "react";
import Contact from "../types/Contact";
import ContactList from "../components/contact/contact-list/ContactList";
import BasicContactViewContainer from "../components/contact/BasicContactViewContainer";
import dataManager from "../util/DataManager";

function ContactsPage() {

    const [activeContact, setActiveContact] = useState<Contact>(new Contact())
    const [contacts, setContacts] = useState<Contact[]>(dataManager.contacts)
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const handleDataManagerChange = (newData: Contact[]) => {
            setContacts(newData);
            // if (activeContact._id !== undefined) {
            //     setActiveContact(dataManager.readContactFromId(activeContact._id))
            // } 
        };
        dataManager.subscribe(handleDataManagerChange);
        return () => {
            dataManager.unsubscribe(handleDataManagerChange);
        };
    }, []); 

    const filteredContacts = contacts.filter((contact) =>
        contact.firstName && contact.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* TODO: better search bar */}
            <div className="contacts-search-bar">
                <input
                    type="text"
                    placeholder="Simple search (firstname)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="half-page-container">
                <div className="scrollable-container" style={{ width: "40%", resize: "horizontal" }}>
                    <p> Contacts: {contacts.length}</p>
                    <ContactList activeContact={activeContact} setActiveContact={setActiveContact} contacts={filteredContacts} />
                </div>
                <div className="scrollable-container" style={{ flex: 1 }} >
                    <BasicContactViewContainer activeContact={activeContact} /> 
                </div>
            </div>
        </div>
    );
}

export default ContactsPage;