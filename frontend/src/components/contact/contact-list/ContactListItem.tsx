import Contact from "../../../../../shared/types/Contact"

function ContactListItem({ contact }: { contact: Contact }) {

    return (
        <div className="list-item">
            <div className="list-item-bar"></div>
            <div className="list-item-content">
                <h3 className="list-item-name">{`${contact.firstName} ${contact.lastName}`}</h3>
                <p className="list-item-description">{contact.title}</p>
            </div>
        </div>
    )
}

export default ContactListItem