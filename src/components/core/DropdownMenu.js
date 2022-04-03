import React from 'react';
import { Dropdown } from '@themesberg/react-bootstrap';


function DropdownMenu({children}) {
    return <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2 App-dropdown-menu">{children}</Dropdown.Menu>
}


export default DropdownMenu;
