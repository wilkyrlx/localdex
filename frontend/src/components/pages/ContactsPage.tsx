import { useState } from "react";
import Contact from "../../../../shared/types/Contact";
import ContactList from "../contact/contact-list/ContactList";
import ContactView from "../contact/contact-view/ContactView";

function ContactsPage() {

    const [activeContact, setActiveContact] = useState<Contact | undefined>(undefined)

    return (
        <div className="contact-page-container">
            <div className="scrollable-container" style={{width: "40%", resize: "horizontal"}}>
                <ContactList setActiveContact={setActiveContact}/>
            </div>
            <div className="scrollable-container" style={{flex: 1}} >
                <ContactView activeContact={activeContact}/>
            </div>
        </div>
    );
}

export default ContactsPage;