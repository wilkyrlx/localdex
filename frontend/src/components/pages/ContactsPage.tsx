import { useEffect, useState } from "react";
import Contact from "../../../../shared/types/Contact";
import ContactList from "../contact/contact-list/ContactList";
import ContactView from "../contact/contact-view/ContactView";
import apiService from "../../api/apiService";

function ContactsPage() {

    const [activeContact, setActiveContact] = useState<Contact | undefined>(undefined)
    const [contacts, setContacts] = useState<Contact[]>([])
    const [searchQuery, setSearchQuery] = useState("");
    const [reloadTrigger, setReloadTrigger] = useState<Number>(1);

    async function loadData() {
        const data = await apiService.getData()
        setContacts(data)
    }

    // load data on page load
    useEffect(() => {
        loadData()
    }, [])

    // load data when reloadTrigger changes
    // TODO: instead of reloadTrigger on every update, what about a "changes have been made" bar that can be clicked to show updates
    useEffect(() => {
        loadData()
    }, [reloadTrigger])

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
            <div className="contact-page-container">
                <div className="scrollable-container" style={{ width: "40%", resize: "horizontal" }}>
                    <p> Contacts: {contacts.length}</p>
                    <ContactList setActiveContact={setActiveContact} contacts={filteredContacts} setReloadTrigger={setReloadTrigger} />
                </div>
                <div className="scrollable-container" style={{ flex: 1 }} >
                    <ContactView activeContact={activeContact} setReloadTrigger={setReloadTrigger} />
                </div>
            </div>
        </div>
    );
}

export default ContactsPage;