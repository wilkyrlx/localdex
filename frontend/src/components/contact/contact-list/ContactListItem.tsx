import Contact from "../../../../../shared/types/Contact"
import { useAppContext, useContextMenuContext } from "../../../AppContext";
import apiService from "../../../api/apiService"

function ContactListItem({ contact, setActiveContact, setReloadTrigger }: { contact: Contact, setActiveContact: any, setReloadTrigger: any }) {


    const { setMessage } = useAppContext();
    const { setContextMenuData } = useContextMenuContext();


    function openContactView() {
        console.log("open contact view")
        setActiveContact(contact)
    }

    function deleteContact() {
        console.log("delete contact")
        apiService.deleteContact(contact)
            .then(() => setMessage(`Successfully deleted ${contact.firstName} ${contact.lastName}`))
        setReloadTrigger(Math.random())
    }

    function handleContextMenu(e: any) {
        e.preventDefault();
        console.log("handle context menu")
        const xPos: number = e.pageX;
        const yPos: number = e.pageY;
        setContextMenuData({ x: xPos, y: yPos, contact: contact });
    }

    return (
        <div className="list-item" onClick={() => openContactView()} onContextMenu={handleContextMenu} >
            <div className="list-item-bar"></div>
            <div className="list-item-content">
                <h3 className="list-item-name">{`${contact.firstName} ${contact.lastName || ""}`}</h3>
                <p className="list-item-description">{contact.title}</p>
            </div>
            <div className="list-item-delete-link" onClick={() => deleteContact()}>x</div>
        </div>
    )
}

export default ContactListItem