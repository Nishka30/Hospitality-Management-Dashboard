import { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

// Mock data for customer details
const mockCustomerDetails = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    checkinDate: "2024-06-08",
    checkoutDate: "2024-06-10",
    roomNumber: "101",
    mode: "QR",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    phone: "098-765-4321",
    email: "jane.smith@example.com",
    checkinDate: "2024-06-09",
    checkoutDate: "2024-06-12",
    roomNumber: "102",
    mode: "Web",
  },
  // Add more mock customer data as needed
];

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(mockCustomerDetails);

  const handleFilter = () => {
    // Implement filtering logic based on startDate and endDate
    if (startDate && endDate) {
      const filtered = mockCustomerDetails.filter((customer) => {
        const checkin = new Date(customer.checkinDate);
        return checkin >= startDate && checkin <= endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(mockCustomerDetails); // Reset to full data if no date range is selected
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
    { field: "id", headerName: "ID", flex: 0.5 },
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
      field: "mode", 
      headerName: "Mode", 
      flex: 1, 
      renderCell: renderMode 
    },
    {
      field: "webCheckin",
      headerName: "Web Check-in",
      flex: 1,
      renderCell: (params) => (
        <Button variant="outlined" size="small" color="primary">
          Web Check-in
        </Button>
      ),
    },
    {
      field: "webCheckout",
      headerName: "Web Check-out",
      flex: 1,
      renderCell: (params) => (
        <Button variant="outlined" size="small" color="secondary">
          Web Check-out
        </Button>
      ),
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
        />
      </Box>
    </Box>
  );
};

export default Contacts;
