import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

// Mock feedback data
const mockFeedbackData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  guestName: `Guest ${index + 1}`,
  feedback: `This is feedback from guest ${index + 1}`,
  isPending: Math.random() < 0.5,
}));

const GuestFeedback = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [feedbackData, setFeedbackData] = useState(mockFeedbackData);

  const handleFeedbackDone = (id) => {
    setFeedbackData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isPending: false } : item
      )
    );
  };

  const pendingFeedback = feedbackData.filter((item) => item.isPending);
  const completedFeedback = feedbackData.filter((item) => !item.isPending);

  const columns = [
    { field: "guestName", headerName: "Guest Name", flex: 1 },
    { field: "feedback", headerName: "Feedback", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleFeedbackDone(params.row.id)}
          disabled={!params.row.isPending}
        >
          Mark as Done
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="GUEST FEEDBACK" subtitle="Manage Guest Feedback" />
      <Box
        m="40px 0 0 0"
        height="35vh"
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
          rows={pendingFeedback}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
        />
      </Box>
      <Box
        m="40px 0 0 0"
        height="35vh"
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
          rows={completedFeedback}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default GuestFeedback;
