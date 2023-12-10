import Contact from "../../../../../shared/types/Contact"
import { useMessageContext, useContextMenuContext } from "../../../AppContext";
import apiService from "../../../util/apiService"

function ContactListItem({ contact, setActiveContact }: { contact: Contact, setActiveContact: any }) {

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

    return (
        <div className="list-item" onClick={() => openContactView()} onContextMenu={handleContextMenu} >
            <div className="list-item-bar"></div>
            <div className="list-item-content">
                <h3 className="list-item-name">{`${contact.firstName} ${contact.lastName || ""}`}</h3>
                <p className="list-item-description">{contact.title}</p>
            </div>
        </div>
    )
}

export default ContactListItem