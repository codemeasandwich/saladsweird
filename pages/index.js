import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';

const AppLandingPage = () => {
    const [location, setLocation] = useState('');
    const [staffMember, setStaffMember] = useState('');
    const [isStaffMemberDisabled, setStaffMemberDisabled] = useState(true);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        // Enable staff member drop down if a location is selected
        setStaffMemberDisabled(event.target.value === '' ? true : false);
    };

    const handleStaffMemberChange = (event) => {
        setStaffMember(event.target.value);
    };

    return (
        <Box
            style={{
                minHeight: '100vh',
                backgroundImage: 'linear-gradient(to right, #ff5e62, #ff9966)',
                display: 'flex',
                flexDirection: 'column',
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
            <Grid container justifyContent="center" style={{ marginTop: '50px' }}>
                <Grid item xs={11} sm={8} md={6} lg={4}>
                    <Box
                        style={{
                            marginTop: '50px',
                            backgroundColor: 'white',
                            padding: '20px',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '5px'
                        }}
                    >
                        <FormControl fullWidth style={{ marginBottom: '20px' }}>
                            <InputLabel id="location-label">Location</InputLabel>
                            <Select
                                labelId="location-label"
                                id="location-select"
                                value={location}
                                onChange={handleLocationChange}
                                label="location"
                            >
                                <MenuItem value={'location1'}>Location 1</MenuItem>
                                <MenuItem value={'location2'}>Location 2</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="staff-member-label">Staff</InputLabel>
                            <Select
                                labelId="staff-member-label"
                                id="staff-member-select"
                                value={staffMember}
                                onChange={handleStaffMemberChange}
                                disabled={isStaffMemberDisabled}
                                label="member"
                            >
                                <MenuItem value={'staff1'}>Staff Member 1</MenuItem>
                                <MenuItem value={'staff2'}>Staff Member 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppLandingPage;
