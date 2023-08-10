import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";

/**
 * Navigation sidebar (sticky)
 * Uses react-sidebar-pro (https://www.npmjs.com/package/react-pro-sidebar)
 */
function SidebarComponent() {
    return (
        <Sidebar>
            <Menu>
                <Link className='sidebar-link' to="/">
                    <MenuItem> Home </MenuItem>
                </Link>
                <Link className='sidebar-link' to="/contact">
                    <MenuItem> Contacts </MenuItem>
                </Link>
                <Link className='sidebar-link' to="/map">
                    <MenuItem> Map </MenuItem>
                </Link>
                <Link className='sidebar-link' to="/import">
                    <MenuItem> Import Contacts </MenuItem>
                </Link>
                <Link className='sidebar-link' to="/about">
                    <MenuItem> About </MenuItem>
                </Link>
            </Menu>
        </Sidebar>
    );
}

export default SidebarComponent;