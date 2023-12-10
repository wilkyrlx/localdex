import Contact from "../../../../../shared/types/Contact";
import { useMessageContext, useContextMenuContext, useReloadTriggerContext } from "../../../AppContext";
import apiService from "../../../util/apiService";

function ContactListItemContextMenu({ x, y, contact }: { x: number, y: number, contact: Contact }) {

    const { setMessage } = useMessageContext();
    const { setContextMenu: setContextMenu } = useContextMenuContext();
    const { setReloadTrigger } = useReloadTriggerContext();
        
    // closes context menu when user clicks anywhere
    window.addEventListener("click", () => {setContextMenu(null)});

    const style: React.CSSProperties = {
        top: y,
        left: x,
    };

    function deleteContact() {
        console.log("deleting contact " + contact.firstName)
        apiService.deleteContact(contact).then(() => setMessage(`Successfully deleted ${contact.firstName} ${contact.lastName}`))
        setReloadTrigger(Math.random())
    }

    return (
        <div style={style} className="context-menu">
            <div className="context-menu-item" onClick={() => {console.log("TODO: archive")}}>Archive</div>
            <div className="context-menu-item" onClick={() => {deleteContact()}}>Delete</div>
        </div>
    );
}

export default ContactListItemContextMenu;