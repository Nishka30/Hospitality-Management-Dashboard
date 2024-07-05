const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001; // Changed the port to 5001

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

// Define a schema and model for customers
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

// Define a schema and model for staff
const staffSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  contact: String,
  age: Number,
  password: String,
  staffAccess: String,
  staffProgress: String,
});

const Staff = mongoose.model('Staff', staffSchema);

// API endpoint to handle customer form submission
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

// API endpoint to handle staff form submission
app.post('/api/staff', (req, res) => {
  const newStaff = new Staff(req.body);
  newStaff.save()
    .then(() => res.status(201).send('Staff profile saved successfully'))
    .catch(err => res.status(400).send('Error saving staff profile: ' + err));
});

// API endpoint to fetch staff
app.get('/api/staff', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to update staff information
// API endpoint to update staff information
app.put('/api/staff/:id', async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStaff);
  } catch (error) {
    console.error('Error updating staff profile:', error);
    res.status(400).json({ error: 'Error updating staff profile' });
  }
});

// API endpoint to delete staff
app.delete('/api/staff/:id', async (req, res) => {
  try {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
    if (!deletedStaff) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting staff profile:', error);
    res.status(400).json({ error: 'Error deleting staff profile' });
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
