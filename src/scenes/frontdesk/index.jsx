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
} from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

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

const roomTypes = ['Normal', 'Deluxe', 'Superior'];

const FrontDesk = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleOpen = (customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };

  const handleFormSubmit = (values) => {
    axios
      .put(`http://localhost:5000/api/customers/${selectedCustomer._id}`, values)
      .then(() => {
        alert('Customer profile updated successfully');
        fetchCustomers();
        handleClose();
      })
      .catch((error) => {
        alert('Error updating customer profile: ' + error.message);
      });
  };

  const renderRooms = (roomType) => {
    const filteredCustomers = customers.filter(
      (customer) => customer.roomType === roomType
    );
    const roomNumbers = [
      ...new Set(filteredCustomers.map((customer) => customer.roomNumber)),
    ];

    return roomNumbers.map((roomNumber) => (
      <TableRow key={roomNumber}>
        <TableCell>{roomNumber}</TableCell>
        {generateDateCells(filteredCustomers, roomNumber)}
      </TableRow>
    ));
  };

  const generateDateCells = (filteredCustomers, roomNumber) => {
    // Generate dates from 7 days before today to 7 days ahead
    const currentDate = new Date();
    const dates = [];
    for (let i = -7; i <= 7; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      dates.push(date.toLocaleDateString()); // Adjust date formatting as needed
    }

    return dates.map((date) => {
      const occupiedCustomer = filteredCustomers.find(
        (customer) =>
          customer.roomNumber === roomNumber &&
          new Date(customer.checkinDate).toLocaleDateString() <= date &&
          new Date(customer.checkoutDate).toLocaleDateString() >= date
      );

      const isOccupied = occupiedCustomer !== undefined;

      return (
        <TableCell
          key={`${roomNumber}-${date}`}
          style={{
            backgroundColor: isOccupied ? 'green' : 'transparent',
            color: isOccupied ? 'white' : 'black',
            padding: '5px',
            marginBottom: '5px',
            cursor: isOccupied ? 'pointer' : 'default',
          }}
          onClick={isOccupied ? () => handleOpen(occupiedCustomer) : undefined}
        >
          {isOccupied && `${occupiedCustomer.firstName} ${occupiedCustomer.lastName}`}
          <br />
          {isOccupied && `${new Date(occupiedCustomer.checkinDate).toLocaleDateString()} - ${new Date(occupiedCustomer.checkoutDate).toLocaleDateString()}`}
        </TableCell>
      );
    });
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Room Occupancy
      </Typography>
      {roomTypes.map((roomType) => (
        <Box key={roomType} mb="20px">
          <Typography variant="h6" gutterBottom>
            {roomType} Rooms
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Room Number</TableCell>
                  {generateDateHeaders()}
                </TableRow>
              </TableHead>
              <TableBody>{renderRooms(roomType)}</TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
      {selectedCustomer && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
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

const generateDateHeaders = () => {
  const headers = [];
  const currentDate = new Date();
  for (let i = -7; i <= 7; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    headers.push(
      <TableCell key={`date-header-${i}`}>
        {date.toLocaleDateString()} {/* Adjust date formatting as needed */}
      </TableCell>
    );
  }
  return headers;
};

export default FrontDesk;
