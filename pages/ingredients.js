import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const IngredientsPage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [name, setName] = useState('');
    const [costPerUnit, setCostPerUnit] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        fetch('/api/ingredients')
            .then(response => response.json())
            .then(data => setIngredients(data.data));
    }, []);

    const addIngredient = async () => {
        const response = await fetch('/api/ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, costPerUnit, location }),
        });

        const data = await response.json();
        setIngredients([...ingredients, data.data]);
    };

    return (
        <Container>
            <TextField value={name} onChange={(e) => setName(e.target.value)} label="Name" />
            <TextField value={costPerUnit} onChange={(e) => setCostPerUnit(e.target.value)} label="Cost per unit" />
            <TextField value={location} onChange={(e) => setLocation(e.target.value)} label="Location" />
            <Button onClick={addIngredient}>Add Ingredient</Button>

            <List>
                {ingredients.map(ingredient => (
                    <ListItem key={ingredient._id}>
                        <ListItemText primary={ingredient.name} secondary={`Cost per unit: ${ingredient.costPerUnit}, Location: ${ingredient.location}`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default IngredientsPage;
