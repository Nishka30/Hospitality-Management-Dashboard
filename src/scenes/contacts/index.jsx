import { useState, useEffect } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import { tokens } from "../../theme"; // Import tokens from your theme file

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Use tokens to get colors

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("${process.env.REACT_APP_API_BASE_URL}/api/customers");
      const formattedData = response.data.map((customer) => ({
        id: customer.idNumber, // Ensure each row has a unique id based on MongoDB _id
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.mobile,
        email: customer.email,
        checkinDate: customer.checkinDate,
        checkoutDate: customer.checkoutDate,
        roomNumber: customer.roomNumber,
        roomType: customer.roomType, // Add roomType field
        webCheckin: customer.checkinStatus === 'checkin pending',
        webCheckout: customer.checkinStatus !== 'checkin pending',
      }));
      setFilteredData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    // Implement filtering logic based on startDate and endDate
    if (startDate && endDate) {
      const filtered = filteredData.filter((customer) => {
        const checkin = new Date(customer.checkinDate);
        return checkin >= startDate && checkin <= endDate;
      });
      setFilteredData(filtered);
    } else {
      fetchData(); // Reset to full data if no date range is selected
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const renderMode = (params) => (
    <Box>
      {params.value === "QR" ? "QR Code" : "Web"}
    </Box>
  );

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "phone", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "checkinDate",
      headerName: "Check-in Date",
      flex: 1,
      valueFormatter: (params) =>
        params.value ? formatDate(params.value) : "",
    },
    {
      field: "checkoutDate",
      headerName: "Checkout Date",
      flex: 1,
      valueFormatter: (params) =>
        params.value ? formatDate(params.value) : "",
    },
    { field: "roomNumber", headerName: "Room Number", flex: 1 },
    { 
      field: "roomType", // Updated to roomType
      headerName: "Room Type", 
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="All Time Check-in Dashboard" />
      <Box m="20px 0" display="flex" justifyContent="space-between">
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              type="date"
              label="Start Date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </Grid>
          <Grid item>
            <TextField
              type="date"
              label="End Date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleFilter}>
              Apply Filter
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        m="20px 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
