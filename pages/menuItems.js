import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const MenuItemsPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        fetch('/api/menuItems')
            .then(response => response.json())
            .then(data => setMenuItems(data.data));
    }, []);

    const addMenuItem = async () => {
        const response = await fetch('/api/menuItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, location }),
        });

        const data = await response.json();
        setMenuItems([...menuItems, data.data]);
    };

    return (
        <Container>
            <TextField value={name} onChange={(e) => setName(e.target.value)} label="Name" />
            <TextField value={price} onChange={(e) => setPrice(e.target.value)} label="Price" />
            <TextField value={location} onChange={(e) => setLocation(e.target.value)} label="Location" />
            <Button onClick={addMenuItem}>Add Menu Item</Button>

            <List>
                {menuItems.map(menuItem => (
                    <ListItem key={menuItem._id}>
                        <ListItemText primary={menuItem.name} secondary={`Price: ${menuItem.price}, Location: ${menuItem.location}`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default MenuItemsPage;
