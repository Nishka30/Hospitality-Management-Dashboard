import React from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

const UpdateSection = () => {
  // Example state variables
  const [roomNumber, setRoomNumber] = React.useState("");
  const [roomType, setRoomType] = React.useState("");
  const [roomRate, setRoomRate] = React.useState("");

  const handleUpdate = () => {
    // Example update functionality
    // Implement your update logic here, e.g., API calls to update room details
    console.log(`Updating room number ${roomNumber} with type ${roomType} and rate ${roomRate}`);
    // Reset form fields after update
    setRoomNumber("");
    setRoomType("");
    setRoomRate("");
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        Update Room Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Room Number"
            variant="outlined"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Room Type"
            variant="outlined"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Room Rate ($)"
            variant="outlined"
            value={roomRate}
            onChange={(e) => setRoomRate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Room
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateSection;
