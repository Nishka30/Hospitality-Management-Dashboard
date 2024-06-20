import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import Header from '../../components/Header';

const Guests = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get('/api/customers'); // Adjust URL as needed
        setGuests(response.data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'mobile', headerName: 'Mobile', flex: 1 },
    { field: 'checkinDate', headerName: 'Check-in Date', flex: 1 },
    { field: 'checkoutDate', headerName: 'Check-out Date', flex: 1 },
    { field: 'roomNumber', headerName: 'Room Number', flex: 1 },
    { field: 'mode', headerName: 'Mode', flex: 1 },
    { field: 'idType', headerName: 'ID Type', flex: 1 },
    { field: 'idValidationStatus', headerName: 'ID Validation Status', flex: 1 },
    { field: 'checkinStatus', headerName: 'Check-in Status', flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="GUESTS" subtitle="Daily Check-in Dashboard" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={guests}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Guests;
