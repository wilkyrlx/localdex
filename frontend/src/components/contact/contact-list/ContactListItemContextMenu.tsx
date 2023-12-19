import Contact from "../../../types/Contact";
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

    function copyContactID() {
        console.log("copying contact ID: " + contact._id)
        navigator.clipboard.writeText(contact._id || "none")
    }

    return (
        <div style={style} className="context-menu">
            <div className="context-menu-item" onClick={() => {console.log("TODO: archive")}}>Archive</div>
            <div className="context-menu-item" onClick={deleteContact}>Delete</div>
            <div className="context-menu-item" onClick={copyContactID}>Copy ID</div>
        </div>
    );
}

export default ContactListItemContextMenu;