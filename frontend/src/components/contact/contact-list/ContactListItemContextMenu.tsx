import Contact from "../../../../../shared/types/Contact";
import { useContextMenuContext } from "../../../AppContext";

function ContactListItemContextMenu({ x, y, contact }: { x: number, y: number, contact: Contact }) {

    // closes context menu when user clicks anywhere
    const { setContextMenuData } = useContextMenuContext();
    window.addEventListener("click", () => {setContextMenuData(null)});

    const style: React.CSSProperties = {
        top: y,
        left: x,
    };

    return (
        <div style={style} className="context-menu">
            <div className="context-menu-item">Edit</div>
            <div className="context-menu-item">Delete</div>
        </div>
    );
}

export default ContactListItemContextMenu;