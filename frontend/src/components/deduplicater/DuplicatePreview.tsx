import Contact from "../../../../shared/types/Contact";
import ContactView from "../contact/contact-view/ContactView";

function DuplicatePreview({contact1, contact2}: {contact1: Contact, contact2: Contact}) {

    return (
        <div>
            <ContactView activeContact={contact1} />
            <ContactView activeContact={contact2} />
        </div>
    );
}