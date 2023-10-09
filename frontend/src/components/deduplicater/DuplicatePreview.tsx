import Contact from "../../../../shared/types/Contact";
import ContactView from "../contact/contact-view/ContactView";

function DuplicatePreview({ contact1, contact2 }: { contact1: Contact, contact2: Contact }) {

    return (
        <div>
            <div className="contact-page-container">
                <div className="scrollable-container" style={{ width: "50%", resize: "horizontal" }}>
                    <ContactView activeContact={contact1} />
                </div>
                <div className="scrollable-container" style={{ width: "50%", resize: "horizontal" }}>
                    <ContactView activeContact={contact2} />
                </div>
            </div>
        </div >
    );
}

export default DuplicatePreview;