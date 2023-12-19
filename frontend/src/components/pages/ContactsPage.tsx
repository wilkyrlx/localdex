import { useEffect, useState } from "react";
import Contact from "../../types/Contact";
import ContactList from "../contact/contact-list/ContactList";
import BasicContactViewContainer from "../contact/BasicContactViewContainer";
import dataManager from "../../util/DataManager";

function ContactsPage() {

    const [activeContact, setActiveContact] = useState<Contact | undefined>(undefined)
    const [contacts, setContacts] = useState<Contact[]>(dataManager.contacts)
    const [searchQuery, setSearchQuery] = useState("");

    // TODO: document this
    useEffect(() => {
        const handleDataManagerChange = (newData: any) => {
            setContacts(newData);
        };

        // Subscribe to DataManager changes
        dataManager.subscribe(handleDataManagerChange);

        // Unsubscribe when the component unmounts
        return () => {
            dataManager.unsubscribe(handleDataManagerChange);
        };
    }, []); // Empty dependency array means this effect runs once, similar to componentDidMount


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
                    <ContactList setActiveContact={setActiveContact} contacts={filteredContacts} />
                </div>
                <div className="scrollable-container" style={{ flex: 1 }} >
                    <BasicContactViewContainer activeContact={activeContact} />
                </div>
            </div>
        </div>
    );
}

export default ContactsPage;