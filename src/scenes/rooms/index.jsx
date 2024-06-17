import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

// Mock room data (40 rooms)
const mockRoomData = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  roomNumber: (101 + index).toString(),
  isOccupied: Math.random() < 0.5,
  isClean: Math.random() < 0.8,
  needsRepair: Math.random() < 0.2,
  reservationId: Math.random() < 0.5 ? `R${index + 1}` : null,
  checkinDateTime: randomDateTime(new Date(2024, 0, 1), new Date()), // Generate random check-in date/time
  checkoutDateTime: randomDateTime(new Date(), new Date(2025, 0, 1)), // Generate random check-out date/time
}));

function randomDateTime(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const RoomBook = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = `${day}, ${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()} ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;
    return formattedDate;
  };

  const columns = [
    { field: "roomNumber", headerName: "Room Number", flex: 1 },
    {
      field: "isOccupied",
      headerName: "Occupied",
      flex: 1,
      type: "boolean",
    },
    {
      field: "isClean",
      headerName: "Clean",
      flex: 1,
      type: "boolean",
    },
    {
      field: "needsRepair",
      headerName: "Needs Repair",
      flex: 1,
      type: "boolean",
    },
    {
      field: "checkinDateTime",
      headerName: "Check-in Date",
      flex: 1,
      valueFormatter: (params) =>
        params.value ? formatDate(params.value) : "",
    },
    {
      field: "checkoutDateTime",
      headerName: "Check-out Date",
      flex: 1,
      valueFormatter: (params) =>
        params.value ? formatDate(params.value) : "",
    },
    {
      field: "reservationId",
      headerName: "Reservation ID",
      flex: 1,
    },
  ];

  const rows = mockRoomData.map((room) => ({
    id: room.id,
    roomNumber: room.roomNumber,
    isOccupied: room.isOccupied,
    isClean: room.isClean,
    needsRepair: room.needsRepair,
    checkinDateTime: room.checkinDateTime,
    checkoutDateTime: room.checkoutDateTime,
    reservationId: room.reservationId,
  }));

  return (
    <Box m="20px">
      <Header title="ROOM BOOKING" subtitle="Room Booking Information" />
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
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default RoomBook;
