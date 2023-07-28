import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const InventoryMovementsPage = () => {
    const [inventoryMovements, setInventoryMovements] = useState([]);
    const [user, setUser] = useState('');
    const [type, setType] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        return;
        fetch('/api/inventoryMovements')
            .then(response => response.json())
            .then(data => setInventoryMovements(data.data));
    }, []);

    const addInventoryMovement = async () => {
        const response = await fetch('/api/inventoryMovements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, type, ingredient, quantity }),
        });

        const data = await response.json();
        setInventoryMovements([...inventoryMovements, data.data]);
    };

    return (
        <Container>
            <TextField value={user} onChange={(e) => setUser(e.target.value)} label="User" />
            <TextField value={type} onChange={(e) => setType(e.target.value)} label="Type" />
            <TextField value={ingredient} onChange={(e) => setIngredient(e.target.value)} label="Ingredient" />
            <TextField value={quantity} onChange={(e) => setQuantity(e.target.value)} label="Quantity" />
            <Button onClick={addInventoryMovement}>Add Inventory Movement</Button>

            <List>
                {inventoryMovements.map(inventoryMovement => (
                    <ListItem key={inventoryMovement._id}>
                        <ListItemText primary={`User: ${inventoryMovement.user}, Type: ${inventoryMovement.type}`} secondary={`Ingredient: ${inventoryMovement.ingredient}, Quantity: ${inventoryMovement.quantity}`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default InventoryMovementsPage;
