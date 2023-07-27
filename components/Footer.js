import React from 'react';
import ActiveLink from './ActiveLink';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KitchenIcon from '@mui/icons-material/Kitchen';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import DescriptionIcon from '@mui/icons-material/Description';

const Footer = () => {
    const [value, setValue] = React.useState('home');

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
            }}
        >
            <BottomNavigationAction label="Ingredients" value="ingredients" icon={<KitchenIcon />} component={ActiveLink} href="/ingredients" />
            <BottomNavigationAction label="Menu Items" value="menuItems" icon={<FastfoodIcon />} component={ActiveLink} href="/menuItems" />
            <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} component={ActiveLink} href="/" />
            <BottomNavigationAction label="Inventory Movements" value="inventoryMovements" icon={<MoveToInboxIcon />} component={ActiveLink} href="/inventoryMovements" />
            <BottomNavigationAction label="Reports" value="reports" icon={<DescriptionIcon />} component={ActiveLink} href="/reports" />
        </BottomNavigation>
    );
};

export default Footer;
