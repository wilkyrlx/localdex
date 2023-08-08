import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


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
            </Sidebar>
    );
}

export default SidebarComponent;