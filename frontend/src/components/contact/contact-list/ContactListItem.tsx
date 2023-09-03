import Contact from "../../../../../shared/types/Contact"

function ContactListItem({ contact, setActiveContact }: { contact: Contact , setActiveContact: any}) {

    function openContactView() {
        console.log("open contact view")
        setActiveContact(contact)
    }

    return (
        <div className="list-item" onClick={() => openContactView()}>
            <div className="list-item-bar"></div>
            <div className="list-item-content">
                <h3 className="list-item-name">{`${contact.firstName} ${contact.lastName || ""}`}</h3>
                <p className="list-item-description">{contact.title}</p>
            </div>
        </div>
    )
}

export default ContactListItem