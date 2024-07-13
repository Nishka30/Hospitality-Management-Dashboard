import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const FoodAndBeverages = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    price: "",
    available: true,
  });
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
    fetchOrders();
    fetchInventoryItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/api/menuItems");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchInventoryItems = async () => {
    try {
      const response = await axios.get("/api/inventoryItems");
      setInventoryItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddNewItem = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    // Reset form fields
    setNewMenuItem({
      name: "",
      price: "",
      available: true,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMenuItem({
      ...newMenuItem,
      [name]: value,
    });
  };

  const handleSubmitNewItem = async () => {
    try {
      await axios.post("/api/menuItems", newMenuItem);
      fetchMenuItems(); // Refresh menu items after adding new item
      handleCloseForm();
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  return (
    <Box m={2}>
      <Typography variant="h4" gutterBottom>
        Food and Beverages
      </Typography>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="food and beverages tabs"
      >
        <Tab label="Menu Management" />
        <Tab label="Order Status" />
        <Tab label="Inventory Management" />
      </Tabs>
      {tabValue === 0 && (
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={handleAddNewItem}
          >
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
                  <TableRow key={item._id}>
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
                  <TableRow key={order._id}>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.item.name}</TableCell>
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
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={handleAddNewItem}
          >
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
                  <TableRow key={item._id}>
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

      {/* Form Dialog */}
      <Dialog open={showForm} onClose={handleCloseForm}>
        <DialogTitle>Add New Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newMenuItem.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={newMenuItem.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="available"
            label="Available"
            type="text"
            fullWidth
            value={newMenuItem.available ? "Yes" : "No"}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitNewItem} color="primary">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FoodAndBeverages;

