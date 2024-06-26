// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/customerCheckin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model
const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  checkinDate: Date,
  checkoutDate: Date,
  roomNumber: String,
  roomType: String,
  checkinTime: String,
  checkoutTime: String,
  mode: String,
  idType: String,
  idValidationStatus: String,
  checkinStatus: String,
  roomAlloted: String,
  omsCheckin: Date,
  omsCheckout: Date,
  idNumber: String
});

const Customer = mongoose.model('Customer', customerSchema);

// API endpoint to handle form submission
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

// API endpoint to fetch customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to update customer details
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

// API endpoint to handle room bookings
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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
