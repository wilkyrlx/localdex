import Contact from "../../../../../shared/types/Contact";
import { useMessageContext, useContextMenuContext } from "../../../AppContext";
import apiService from "../../../api/apiService";

function ContactListItemContextMenu({ x, y, contact }: { x: number, y: number, contact: Contact }) {

    const { setMessage } = useMessageContext();
    const { setContextMenu: setContextMenu } = useContextMenuContext();
        
    // closes context menu when user clicks anywhere
    window.addEventListener("click", () => {setContextMenu(null)});

    const style: React.CSSProperties = {
        top: y,
        left: x,
    };

    function deleteContact() {
        console.log("deleting contact " + contact.firstName)
        apiService.deleteContact(contact).then(() => setMessage(`Successfully deleted ${contact.firstName} ${contact.lastName}`))
        // TODO: activate reload trigger
        //     setReloadTrigger(Math.random())
    }

    return (
        <div style={style} className="context-menu">
            <div className="context-menu-item">Archive</div>
            <div className="context-menu-item" onClick={() => {deleteContact()}}>Delete</div>
        </div>
    );
}

export default ContactListItemContextMenu;