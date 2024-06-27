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
import { constrainPoint } from '@fullcalendar/core';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email('Invalid email format').required('Required'),
  mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Required'),
  checkinDate: yup.date().required('Required'),
  checkoutDate: yup.date().required('Required'),
  checkinTime: yup.string().required('Required'),
  checkoutTime: yup.string().required('Required'),
  roomNumber: yup.number().required('Required'),
});

const roomTypes = [
  { type: 'Standard', range: { start: 101, end: 115 } },
  { type: 'Deluxe', range: { start: 116, end: 130 } },
  { type: 'Superior', range: { start: 131, end: 140 } },
];

const FrontDesk = () => {
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [open, setOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchCustomers();
    initializeRooms();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      console.log(response.data)
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const initializeRooms = () => {
    const initialRooms = [];
    for (let i = 101; i <= 140; i++) {
      let roomType = 'Standard';
      if (i >= 116 && i <= 130) roomType = 'Deluxe';
      if (i >= 131 && i <= 140) roomType = 'Superior';

      initialRooms.push({
        roomNumber: i,
        roomType: roomType,
      });
    }
    setRooms(initialRooms);
  };

  const handleOpen = (customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };

  const handleBookingOpen = (roomNumber, roomType) => {
    setSelectedRoom({ roomNumber, roomType });
    setIsBookingOpen(true);
  };

  const handleBookingClose = () => {
    setIsBookingOpen(false);
    setSelectedRoom(null);
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

  const handleBookingSubmit = (values) => {
    const newBooking = {
      ...values,
      roomNumber: selectedRoom.roomNumber,
      roomType: selectedRoom.roomType,
    };

    axios
      .post('http://localhost:5000/api/bookings', newBooking)
      .then(() => {
        alert('Room booked successfully');
        fetchCustomers();
        handleBookingClose();
      })
      .catch((error) => {
        alert('Error booking room: ' + error.message);
      });
  };

  const renderRooms = (roomType) => {
    const filteredRooms = rooms.filter((room) => room.roomType === roomType);
    return (
      <Box key={roomType}>
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
                  {generateDateCells(room.roomNumber, room.roomType)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

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
          Number(customer.roomNumber) === roomNumber &&
          customer.roomType === roomType &&
          new Date(customer.checkinDate).toLocaleDateString() <= date &&
          new Date(customer.checkoutDate).toLocaleDateString() >= date
      );

      if (occupiedCustomer) {
        const checkinDate = new Date(occupiedCustomer.checkinDate);
        const checkoutDate = new Date(occupiedCustomer.checkoutDate);
        const colSpan = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24) + 1);

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
              cursor: 'pointer',
            }}
            onClick={() => handleBookingOpen(roomNumber, roomType)}
          />
        );
      }
    });

    return cells;
  };

  const getRoomNumberRange = (type) => {
    const roomType = roomTypes.find((roomType) => roomType.type === type);
    return `${roomType.range.start} to ${roomType.range.end}`;
  };

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
            borderRight: i < 10 ? '1px solid #e0e0e0' : 'none',
          }}
        >
          {date.toLocaleDateString()}
        </TableCell>
      );
    }
    return headers;
  };

  return (
    <Box m="20px" display="grid" gridGap="20px" gridTemplateColumns="1fr 1fr">
      <Box>
        <Typography variant="h4" gutterBottom>
          Room Occupancy
        </Typography>
        {roomTypes.map((roomType) => (
          <Box key={roomType.type} mb="20px">
            {renderRooms(roomType.type)}
          </Box>
        ))}
      </Box>

      <Modal open={isBookingOpen} onClose={handleBookingClose}>
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
          <Typography variant="h6" gutterBottom>
            Book Room
          </Typography>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              mobile: '',
              checkinDate: '',
              checkoutDate: '',
              checkinTime: '',
              checkoutTime: '',
              roomNumber: selectedRoom ? selectedRoom.roomNumber : '',
              roomType: selectedRoom ? selectedRoom.roomType : '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleBookingSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="mobile"
                  label="Mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.mobile && Boolean(errors.mobile)}
                  helperText={touched.mobile && errors.mobile}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="checkinDate"
                  label="Check-in Date"
                  type="date"
                  value={values.checkinDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.checkinDate && Boolean(errors.checkinDate)}
                  helperText={touched.checkinDate && errors.checkinDate}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  name="checkoutDate"
                  label="Check-out Date"
                  type="date"
                  value={values.checkoutDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.checkoutDate && Boolean(errors.checkoutDate)}
                  helperText={touched.checkoutDate && errors.checkoutDate}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  name="checkinTime"
                  label="Check-in Time"
                  type="time"
                  value={values.checkinTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.checkinTime && Boolean(errors.checkinTime)}
                  helperText={touched.checkinTime && errors.checkinTime}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  name="checkoutTime"
                  label="Check-out Time"
                  type="time"
                  value={values.checkoutTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.checkoutTime && Boolean(errors.checkoutTime)}
                  helperText={touched.checkoutTime && errors.checkoutTime}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Book
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

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
          <Typography variant="h6" gutterBottom>
            Customer Details
          </Typography>
          {selectedCustomer && (
            <Formik
              initialValues={{
                firstName: selectedCustomer.firstName || '',
                lastName: selectedCustomer.lastName || '',
                email: selectedCustomer.email || '',
                mobile: selectedCustomer.mobile || '',
                checkinDate: selectedCustomer.checkinDate ? new Date(selectedCustomer.checkinDate).toISOString().split('T')[0] : '',
                checkoutDate: selectedCustomer.checkoutDate ? new Date(selectedCustomer.checkoutDate).toISOString().split('T')[0] : '',
                checkinTime: selectedCustomer.checkinTime || '',
                checkoutTime: selectedCustomer.checkoutTime || '',
                roomNumber: selectedCustomer.roomNumber || '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="mobile"
                    label="Mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.mobile && Boolean(errors.mobile)}
                    helperText={touched.mobile && errors.mobile}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="checkinDate"
                    label="Check-in Date"
                    type="date"
                    value={values.checkinDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.checkinDate && Boolean(errors.checkinDate)}
                    helperText={touched.checkinDate && errors.checkinDate}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    name="checkoutDate"
                    label="Check-out Date"
                    type="date"
                    value={values.checkoutDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.checkoutDate && Boolean(errors.checkoutDate)}
                    helperText={touched.checkoutDate && errors.checkoutDate}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    name="checkinTime"
                    label="Check-in Time"
                    type="time"
                    value={values.checkinTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.checkinTime && Boolean(errors.checkinTime)}
                    helperText={touched.checkinTime && errors.checkinTime}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    name="checkoutTime"
                    label="Check-out Time"
                    type="time"
                    value={values.checkoutTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.checkoutTime && Boolean(errors.checkoutTime)}
                    helperText={touched.checkoutTime && errors.checkoutTime}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update
                  </Button>
                </form>
              )}
            </Formik>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default FrontDesk;
