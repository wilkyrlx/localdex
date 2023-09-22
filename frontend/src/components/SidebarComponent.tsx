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
                <MenuItem component={<Link to="/" />}> Home </MenuItem>
                <MenuItem component={<Link to="/contact" />}> Contacts </MenuItem>
                <MenuItem component={<Link to="/map" />}> Map </MenuItem>
                <MenuItem component={<Link to="/import" />}> Import Contacts </MenuItem>
                <MenuItem component={<Link to="/about" />}> About </MenuItem>
            </Menu>
        </Sidebar>
    );
}

export default SidebarComponent;