import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

// Validation schema using Yup
const validationSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email('Invalid email format').required('Required'),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Required'),
  checkinDate: yup.date().required('Required'),
  checkoutDate: yup.date().required('Required'),
  checkinTime: yup.string().required('Required'),
  checkoutTime: yup.string().required('Required'),
});

// Array of room types with corresponding room number ranges
const roomTypes = [
  { type: 'Standard', range: { start: 101, end: 115 } },
  { type: 'Deluxe', range: { start: 116, end: 130 } },
  { type: 'Superior', range: { start: 131, end: 140 } },
];

const FrontDesk = () => {
  // State variables
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch initial customer data on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Function to fetch customers data from the server
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Function to handle modal opening with selected customer details
  const handleOpen = (customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  // Function to handle modal closing
  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };

  // Function to handle form submission for updating customer details
  const handleFormSubmit = (values) => {
    axios
      .put(`http://localhost:5000/api/customers/${selectedCustomer._id}`, values)
      .then(() => {
        alert('Customer profile updated successfully');
        fetchCustomers(); // Refresh the customer list after update
        handleClose(); // Close the modal after successful update
      })
      .catch((error) => {
        alert('Error updating customer profile: ' + error.message);
      });
  };

  // UseEffect to generate initial rooms on component mount
  useEffect(() => {
    const initialRooms = [];

    // Generate rooms for each room type
    for (let i = 101; i <= 140; i++) {
      let roomType = 'Standard';
      if (i >= 116 && i <= 130) roomType = 'Deluxe';
      if (i >= 131 && i <= 140) roomType = 'Superior';

      initialRooms.push({
        roomNumber: i,
        roomType: roomType,
      });
    }

    setCustomers(initialRooms); // Set initial rooms to state
  }, []);

  // Function to render room occupancy for a specific room type
  const renderRooms = (roomType) => {
    // Filter rooms based on room type
    const filteredRooms = customers.filter((room) => room.roomType === roomType);

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {roomType} Rooms ({getRoomNumberRange(roomType)})
        </Typography>
        <Divider />
        <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Room Number</TableCell>
                {generateDateHeaders()}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.roomNumber}>
                  <TableCell>{room.roomNumber}</TableCell>
                  {generateDateCells(room.roomNumber, roomType)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  // Function to generate date cells for room occupancy
  const generateDateCells = (roomNumber, roomType) => {
    const currentDate = new Date();
    const dates = [];
    for (let i = -9; i <= 10; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      dates.push(date.toLocaleDateString());
    }

    const cells = [];
    let skipCount = 0;

    dates.forEach((date, index) => {
      if (skipCount > 0) {
        skipCount--;
        return;
      }

      const occupiedCustomer = customers.find(
        (customer) =>
          customer.roomNumber === roomNumber &&
          customer.roomType === roomType &&
          new Date(customer.checkinDate).toLocaleDateString() <= date &&
          new Date(customer.checkoutDate).toLocaleDateString() >= date
      );

      if (occupiedCustomer) {
        const checkinDate = new Date(occupiedCustomer.checkinDate);
        const checkoutDate = new Date(occupiedCustomer.checkoutDate);
        const colSpan = Math.ceil(
          (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24) + 1
        );

        cells.push(
          <TableCell
            key={`${roomNumber}-${date}`}
            colSpan={colSpan}
            style={{
              backgroundColor: '#4caf50',
              color: '#ffffff',
              padding: '5px',
              cursor: 'pointer',
              borderRight: index + colSpan - 1 < dates.length ? '1px solid #e0e0e0' : 'none',
            }}
            onClick={() => handleOpen(occupiedCustomer)}
          >
            <Typography variant="body2">
              {`${occupiedCustomer.firstName} ${occupiedCustomer.lastName}`}
            </Typography>
            <Typography variant="body2">
              {`${checkinDate.toLocaleDateString()} - ${checkoutDate.toLocaleDateString()}`}
            </Typography>
          </TableCell>
        );

        skipCount = colSpan - 1;
      } else {
        cells.push(
          <TableCell
            key={`${roomNumber}-${date}`}
            style={{
              backgroundColor: '#ffffff',
              color: '#000000',
              padding: '5px',
              borderRight: index < dates.length - 1 ? '1px solid #e0e0e0' : 'none',
            }}
          />
        );
      }
    });

    return cells;
  };

  // Function to render each row for room occupancy
  const renderRoomRow = (room, roomType) => (
    <TableRow key={room.roomNumber}>
      <TableCell>{room.roomNumber}</TableCell>
      {generateDateCells(room.roomNumber, roomType)}
    </TableRow>
  );

  // Function to get the room number range for a specific room type
  const getRoomNumberRange = (type) => {
    const roomType = roomTypes.find((roomType) => roomType.type === type);
    return `${roomType.range.start} to ${roomType.range.end}`;
  };

  return (
    <Box m="20px" display="grid" gridGap="20px" gridTemplateColumns="1fr 1fr">
      <Box>
        <Typography variant="h4" gutterBottom>
          Room Occupancy
        </Typography>

        {/* Render rooms for each room type */}
        {roomTypes.map((roomType) => (
          <Box key={roomType.type} mb="20px">
            {renderRooms(roomType.type)}
          </Box>
        ))}
      </Box>

      {/* Modal for editing customer details */}
      {selectedCustomer && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: '#f0f0f0',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Formik
              initialValues={selectedCustomer}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  {/* Form fields for editing customer details */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={!!touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ marginBottom: '10px' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ marginBottom: '10px' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ marginBottom: '10px' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Mobile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mobile}
                    name="mobile"
                    error={!!touched.mobile && !!errors.mobile}
                    helperText={touched.mobile && errors.mobile}
                    sx={{ marginBottom: '10px' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Check-in Date"
                    InputLabelProps={{ shrink: true }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.checkinDate}
                    name="checkinDate"
                    error={!!touched.checkinDate && !!errors.checkinDate}
                    helperText={touched.checkinDate && errors.checkinDate}
                    sx={{ marginBottom: '10px' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="time"
                    label="Check-in Time"
                    InputLabelProps={{ shrink: true }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.checkinTime}
                    name="checkinTime"
                    error={!!touched.checkinTime && !!errors.checkinTime}
                    helperText={touched.checkinTime && errors.checkinTime}
                    sx={{ marginBottom: '10px' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Checkout Date"
                    InputLabelProps={{ shrink: true }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.checkoutDate}
                    name="checkoutDate"
                    error={!!touched.checkoutDate && !!errors.checkoutDate}
                    helperText={touched.checkoutDate && errors.checkoutDate}
                    sx={{ marginBottom: '10px' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="time"
                    label="Checkout Time"
                    InputLabelProps={{ shrink: true }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.checkoutTime}
                    name="checkoutTime"
                    error={!!touched.checkoutTime && !!errors.checkoutTime}
                    helperText={touched.checkoutTime && errors.checkoutTime}
                    sx={{ marginBottom: '10px' }}
                  />
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    sx={{ marginTop: '10px' }}
                  >
                    Update Customer
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

// Function to generate date headers for the table
const generateDateHeaders = () => {
  const currentDate = new Date();
  const headers = [];
  for (let i = -9; i <= 10; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    headers.push(
      <TableCell
        key={`date-header-${i}`}
        align="center"
        style={{
          backgroundColor: '#f0f0f0',
          color: '#000000',
          padding: '10px',
          borderRight: i < 10 ? '1px solid #e0e0e0' : 'none', // Add border to all but last header cell
        }}
      >
        {date.toLocaleDateString()} {/* Adjust date formatting as needed */}
      </TableCell>
    );
  }
  return headers;
};

export default FrontDesk;
