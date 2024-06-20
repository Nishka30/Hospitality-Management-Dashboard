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

// Define a schema and model
const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  checkinDate: Date,
  checkoutDate: Date,
  roomNumber: String,
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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('http://localhost:5000/api/customers', async (req, res) => {
    try {
      const guests = await Guest.find();
      res.json(guests);
    } catch (error) {
      console.error('Error fetching guests:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  