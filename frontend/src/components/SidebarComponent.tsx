import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";


function SidebarComponent() {
    return (
            <Sidebar>
                <Menu>
                    <MenuItem> Today </MenuItem>
                    <MenuItem> Contacts </MenuItem>
                    <MenuItem> Map </MenuItem>
                    <MenuItem> Import </MenuItem>
                    <MenuItem> Settings </MenuItem>
                </Menu>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </Sidebar>
    );
}

export default SidebarComponent;