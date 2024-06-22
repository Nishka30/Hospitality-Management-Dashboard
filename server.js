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
mongoose.connect('mongodb://localhost:27017/customerCheckin', { useNewUrlParser: true, useUnifiedTopology: true });

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
  roomType: String,        // New field
  checkinTime: String,     // New field
  checkoutTime: String,    // New field
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
app.post('/api/customers', (req, res) => {
  const newCustomer = new Customer(req.body);
  newCustomer.save()
    .then(() => res.status(201).send('Customer profile saved successfully'))
    .catch(err => res.status(400).send('Error saving customer profile: ' + err));
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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
