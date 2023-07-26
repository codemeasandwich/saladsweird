import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Grid } from '@mui/material';

const HomePage = () => {
    return (
        <Container maxWidth="sm">
            <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Welcome to Weird Salads Inventory System
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" component={Link} href="/ingredients">
                        Manage Ingredients
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" component={Link} href="/menuItems">
                        Manage Menu Items
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" component={Link} href="/inventoryMovements">
                        Manage Inventory Movements
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" component={Link} href="/reports">
                        View Reports
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
