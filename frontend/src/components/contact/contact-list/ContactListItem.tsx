import Contact from "../../../types/Contact"
import { useMessageContext, useContextMenuContext } from "../../../AppContext";

function ContactListItem({ activeContact, contact, setActiveContact }: { activeContact: Contact, contact: Contact, setActiveContact: any }) {

    const { setContextMenu: setContextMenu } = useContextMenuContext();


    function openContactView() {
        console.log("open contact view")
        setActiveContact(contact)
    }

    function handleContextMenu(e: any) {
        e.preventDefault();
        console.log("handle context menu")
        const xPos: number = e.pageX;
        const yPos: number = e.pageY;
        setContextMenu({ x: xPos, y: yPos, contact: contact });
    }

    function isActiveContact() {
        return activeContact._id === contact._id;
    }

    return (
        <div className="list-item" onClick={() => openContactView()} onContextMenu={handleContextMenu} >
            <div className="list-item-bar"></div>
            { isActiveContact() && <div className="list-item-bar-red"></div>}
            <div className="list-item-content">
                <h3 className="list-item-name">{`${contact.firstName} ${contact.lastName || ""}`}</h3>
                <p className="list-item-description">{contact.title}</p>
            </div>
        </div>
    )
}

export default ContactListItem