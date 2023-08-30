import ContactList from "../contact/contact-list/ContactList";
import ContactView from "../contact/contact-view/ContactView";

function ContactsPage() {
    return (
        <div className="contact-page-container">
            <div className="scrollable-container" style={{width: "40%", resize: "horizontal"}}>
                <ContactList />
            </div>
            <div className="scrollable-container" style={{flex: 1}} >
                <ContactView />
            </div>
        </div>
    );
}

export default ContactsPage;