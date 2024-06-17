import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

// Mock data for guests
const mockDataGuests = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    checkInDate: "2024-06-08",
    checkOutDate: "2024-06-12",
    roomNumber: "101",
    mode: "Web",
    idType: "Passport",
    isIDValidated: "Success",
    checkinStatus: "Ready for Check-in",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    checkInDate: "2024-06-09",
    checkOutDate: "2024-06-13",
    roomNumber: "102",
    mode: "QR",
    idType: "Driver's License",
    isIDValidated: "Failed",
    checkinStatus: "Check-in Link Clicked",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    phone: "555-123-4567",
    checkInDate: "2024-06-10",
    checkOutDate: "2024-06-14",
    roomNumber: "103",
    mode: "Direct",
    idType: "ID Card",
    isIDValidated: "Success",
    checkinStatus: "Form Submitted",
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    email: "bob.brown@example.com",
    phone: "444-555-6666",
    checkInDate: "2024-06-11",
    checkOutDate: "2024-06-15",
    roomNumber: "104",
    mode: "Web",
    idType: "Passport",
    isIDValidated: "Success",
    checkinStatus: "PMS Checked-in",
  },
  // Add more mock guest data as needed
];

const Guests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "firstName", headerName: "First Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "lastName", headerName: "Last Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "checkInDate", headerName: "Check-in Date", flex: 1 },
    { field: "checkOutDate", headerName: "Check-out Date", flex: 1 },
    { field: "roomNumber", headerName: "Room Number", flex: 1 },
    { field: "mode", headerName: "Mode", flex: 1 },
    { field: "idType", headerName: "ID Type", flex: 1 },
    { field: "isIDValidated", headerName: "ID Validation Status", flex: 1 },
    { field: "checkinStatus", headerName: "Check-in Status", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="GUESTS"
        subtitle="Daily Check-in Dashboard"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
          rows={mockDataGuests}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Guests;
