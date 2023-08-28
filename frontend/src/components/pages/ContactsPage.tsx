import ContactList from "../contact/contact-list/ContactList";
import ContactView from "../contact/contact-view/ContactView";

function ContactsPage() {
    return (
        <div>
            <h1>Contacts</h1>
            <p>This is the contacts page</p>
            <ContactList />
            <ContactView />
        </div>
    );
}

export default ContactsPage;