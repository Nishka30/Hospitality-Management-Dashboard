import React, { useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tabs, Tab } from "@mui/material";

const FoodAndBeverages = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const menuItems = [
    { id: 1, name: 'Pasta', price: 12.99, available: true },
    { id: 2, name: 'Pizza', price: 15.99, available: false },
  ];

  const orders = [
    { id: 1, customer: 'John Doe', item: 'Pasta', status: 'Delivered' },
    { id: 2, customer: 'Jane Smith', item: 'Pizza', status: 'Pending' },
  ];

  const inventoryItems = [
    { id: 1, name: 'Tomatoes', quantity: 50, unit: 'kg' },
    { id: 2, name: 'Cheese', quantity: 20, unit: 'kg' },
  ];

  return (
    <Box m={2}>
      <Typography variant="h4" gutterBottom>
        Food and Beverages
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="food and beverages tabs">
        <Tab label="Menu Management" />
        <Tab label="Order Status" />
        <Tab label="Inventory Management" />
      </Tabs>
      {tabValue === 0 && (
        <Box>
          <Button variant="contained" color="primary" sx={{ mb: 2 }}>
            Add New Item
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Available</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.available ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {tabValue === 1 && (
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.item}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {tabValue === 2 && (
        <Box>
          <Button variant="contained" color="primary" sx={{ mb: 2 }}>
            Add New Item
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default FoodAndBeverages;
