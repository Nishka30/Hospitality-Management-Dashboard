import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

// Mock data for invoices
const mockDataInvoices = [
  {
    id: 1,
    reservationId: "R001",
    roomNumber: "101",
    bookingAmount: 5000,
    otherServiceAmount: 1000,
    totalAmountDue: 6000,
    isInvoicePaid: false,
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    reservationId: "R002",
    roomNumber: "102",
    bookingAmount: 5000,
    otherServiceAmount: 500,
    totalAmountDue: 5500,
    isInvoicePaid: true,
    paymentMethod: "Cash",
  },
  // Add more mock invoice data as needed
];

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "reservationId", headerName: "Reservation ID", flex: 1 },
    { field: "roomNumber", headerName: "Room Number", flex: 1 },
    {
      field: "bookingAmount",
      headerName: "Booking Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography>${params.row.bookingAmount}</Typography>
      ),
    },
    {
      field: "otherServiceAmount",
      headerName: "Other Service Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography>${params.row.otherServiceAmount}</Typography>
      ),
    },
    {
      field: "totalAmountDue",
      headerName: "Total Amount Due",
      flex: 1,
      renderCell: (params) => (
        <Typography>${params.row.totalAmountDue}</Typography>
      ),
    },
    {
      field: "isInvoicePaid",
      headerName: "Invoice Paid",
      flex: 1,
      type: "boolean",
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
        }}
      >
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoices;
