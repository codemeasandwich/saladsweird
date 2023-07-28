import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [location, setLocation] = useState('');
    const [month, setMonth] = useState('');

    useEffect(() => {
        return;
        fetch('/api/reports')
            .then(response => response.json())
            .then(data => setReports(data.data));
    }, []);

    const addReport = async () => {
        const response = await fetch('/api/reports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ location, month }),
        });

        const data = await response.json();
        setReports([...reports, data.data]);
    };

    return (
        <Container>
            <TextField value={location} onChange={(e) => setLocation(e.target.value)} label="Location" />
            <TextField value={month} onChange={(e) => setMonth(e.target.value)} label="Month" />
            <Button onClick={addReport}>Generate Report</Button>

            <List>
                {reports.map(report => (
                    <ListItem key={report._id}>
                        <ListItemText primary={`Location: ${report.location}, Month: ${report.month}`} secondary={`Total Cost of Deliveries: ${report.totalCostOfDeliveries}, Total Sales Revenue: ${report.totalSalesRevenue}, Total Value of Inventory: ${report.totalValueOfInventory}, Total Waste Cost: ${report.totalWasteCost}`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ReportsPage;
