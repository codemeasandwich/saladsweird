import React from 'react';
import { Box, Typography } from '@mui/material';

const AppLandingPage = () => {
    return (
        <Box
            style={{
                minHeight: '100vh',
                backgroundImage: 'linear-gradient(to right, #ff5e62, #ff9966)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}
        >
            <Typography
                variant="h2"
                style={{
                    color: 'white',
                    textShadow: '2px 2px 4px #000000',
                    fontWeight: 'bold'
                }}
            >
                Welcome to the Super Inventory System
            </Typography>
        </Box>
    );
};

export default AppLandingPage;
