import React from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import VisibilityIcon from '@mui/icons-material/Visibility';

const botData = [
  { id: 1, botName: 'Check In 1', activity: 'Check In', startTime: '08:00 AM', status: 'In Progress' },
  { id: 2, botName: 'Check In 2', activity: 'Check In', startTime: '09:00 AM', status: 'Completed' },
  { id: 3, botName: 'Check Out 1', activity: 'Check Out', startTime: '10:00 AM', status: 'Idle' },
  { id: 4, botName: 'Check Out 2', activity: 'Check Out', startTime: '11:00 AM', status: 'Failed' },
  { id: 5, botName: 'Night Audit 1', activity: 'Night Audit', startTime: '12:00 AM', status: 'In Progress' },
];

const BotStatus = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleStartStopBot = (id, action) => {
    console.log(`${action} bot with id: ${id}`);
    // Add your logic to start or stop the bot here
  };

  const handleViewLogs = (id) => {
    console.log(`Viewing logs for bot with id: ${id}`);
    // Add your logic to view logs here
  };

  const columns = [
    { field: 'botName', headerName: 'Bot Name', flex: 1 },
    { field: 'activity', headerName: 'Activity', flex: 1 },
    { field: 'startTime', headerName: 'Starting Time', flex: 1 },
    { field: 'status', headerName: 'Current Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around" width="100%">
          {params.row.status === 'In Progress' ? (
            <IconButton onClick={() => handleStartStopBot(params.row.id, 'Stop')}>
              <StopIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleStartStopBot(params.row.id, 'Start')}>
              <PlayArrowIcon />
            </IconButton>
          )}
          <IconButton onClick={() => handleViewLogs(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2}>Operational Status - Bot Status</Typography>
      <Box
        height="400px"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={botData} columns={columns} />
      </Box>
    </Box>
  );
};

export default BotStatus;
