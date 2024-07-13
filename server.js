const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/customerCheckin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schemas and models

// Customer schema and model (unchanged from previous)
const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  checkinDate: { type: Date, required: true },
  checkoutDate: { type: Date, required: true },
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true },
  checkinTime: { type: String, required: true },
  checkoutTime: { type: String, required: true },
  mode: { type: String, required: true },
  idType: { type: String, required: true },
  idValidationStatus: { type: String, required: true },
  checkinStatus: { type: String, required: true },
  roomAlloted: { type: String, required: true },
  omsCheckin: { type: Date, required: true },
  omsCheckout: { type: Date, required: true },
  idNumber: { type: String, required: true },
  totalGuests: { type: Number, required: true },
});

const Customer = mongoose.model('Customer', customerSchema);

// Staff schema and model (unchanged from previous)
const staffSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  staffAccess: { type: String, required: true },
  staffProgress: { type: String, required: true },
  idType: { type: String, required: true },
  idNumber: { type: String, required: true },
});

const Staff = mongoose.model('Staff', staffSchema);

// Menu Item schema and model (new for food section)
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Order schema and model (unchanged from previous)
const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  status: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

// API endpoints

// Create new customer profile (unchanged from previous)
app.post('/api/customers', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).send('Customer profile saved successfully');
  } catch (error) {
    console.error('Error saving customer profile:', error.message);
    res.status(400).send('Error saving customer profile: ' + error.message);
  }
});

// Fetch all customers (unchanged from previous)
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update customer profile by ID (unchanged from previous)
app.put('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedCustomer) {
      return res.status(404).send('Customer not found');
    }
    res.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer profile:', error.message);
    res.status(400).send('Error updating customer profile: ' + error.message);
  }
});

// Book a room (create new customer profile) (unchanged from previous)
app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Customer(req.body);
    await newBooking.save();
    res.status(201).send('Room booked successfully');
  } catch (error) {
    console.error('Error booking room:', error.message);
    res.status(400).send('Error booking room: ' + error.message);
  }
});

// Create new staff profile (unchanged from previous)
app.post('/api/staff', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).send('Staff profile saved successfully');
  } catch (error) {
    console.error('Error saving staff profile:', error.message);
    res.status(400).send('Error saving staff profile: ' + error.message);
  }
});

// Update staff profile by ID (unchanged from previous)
app.put('/api/staff/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStaff = await Staff.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedStaff) {
      return res.status(404).send('Staff not found');
    }
    res.json(updatedStaff);
  } catch (error) {
    console.error('Error updating staff profile:', error.message);
    res.status(400).send('Error updating staff profile: ' + error.message);
  }
});

// Delete staff profile by ID (unchanged from previous)
app.delete('/api/staff/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (!deletedStaff) {
      return res.status(404).send('Staff not found');
    }
    res.json({ message: 'Staff profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff profile:', error.message);
    res.status(400).send('Error deleting staff profile: ' + error.message);
  }
});

// Fetch all staff members (unchanged from previous)
app.get('/api/staff', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    console.error('Error fetching staff data:', error.message);
    res.status(500).send('Error fetching staff data: ' + error.message);
  }
});

// Create new menu item (new for food section)
app.post('/api/menuItems', async (req, res) => {
  try {
    const newMenuItem = new MenuItem(req.body);
    await newMenuItem.save();
    res.status(201).send('Menu item added successfully');
  } catch (error) {
    console.error('Error adding menu item:', error.message);
    res.status(400).send('Error adding menu item: ' + error.message);
  }
});

// Fetch all menu items (new for food section)
app.get('/api/menuItems', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update menu item by ID (new for food section)
app.put('/api/menuItems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedMenuItem) {
      return res.status(404).send('Menu item not found');
    }
    res.json(updatedMenuItem);
  } catch (error) {
    console.error('Error updating menu item:', error.message);
    res.status(400).send('Error updating menu item: ' + error.message);
  }
});

// Delete menu item by ID (new for food section)
app.delete('/api/menuItems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).send('Menu item not found');
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error.message);
    res.status(400).send('Error deleting menu item: ' + error.message);
  }
});

// Place an order (unchanged from previous)
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).send('Order placed successfully');
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(400).send('Error placing order: ' + error.message);
  }
});

// Fetch all orders (unchanged from previous)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('item');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update order by ID (unchanged from previous)
app.put('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedOrder) {
      return res.status(404).send('Order not found');
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error.message);
    res.status(400).send('Error updating order: ' + error.message);
  }
});

// Delete order by ID (unchanged from previous)
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).send('Order not found');
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(400).send('Error deleting order: ' + error.message);
  }
});

// Fetch total guests across all customer records (unchanged from previous)
app.get('/api/totalGuests', async (req, res) => {
  try {
    const customers = await Customer.find();
    let totalGuests = 0;
    customers.forEach(customer => {
      totalGuests += customer.totalGuests || 0;
    });
    res.json({ totalGuests });
  } catch (error) {
    console.error('Error fetching total guests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
