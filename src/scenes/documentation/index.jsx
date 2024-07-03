import React from 'react';
import { Box, Typography, TextField, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme'; // Import your theme tokens here

const DocumentationPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSaveDocumentation = () => {
    // Handle saving documentation logic goes here
    // Example: Send API request to save documentation
    console.log('Documentation saved');
    // Replace with actual logic to save documentation to your backend or state
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        py: 4,
        px: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: '800px',
          mx: 'auto',
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Project Documentation
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Download Instructions
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Write download instructions here..."
            sx={{ mb: 2 }}
            defaultValue="Provide detailed instructions on how to download and install the project."
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            How to Use
          </Typography>
          <TextField
            multiline
            rows={8}
            fullWidth
            variant="outlined"
            placeholder="Write usage instructions here..."
            sx={{ mb: 2 }}
            defaultValue="Provide detailed instructions on how to use the project. Include screenshots and step-by-step guidelines if necessary."
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Features Description
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Room Booking
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              defaultValue="Room booking feature allows users to reserve rooms in the hotel. It includes options to select room type, check availability, and make reservations."
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Adding New Guests through Form
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              defaultValue="This feature allows the hotel staff to add new guests by filling out a form with the guest's details, including name, contact information, and room preferences."
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Night Audit
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              defaultValue="Night audit feature provides a comprehensive overview of the day's transactions and activities, ensuring that all data is accurate and up-to-date."
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Resources
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              defaultValue="The resources section includes tutorials and guides on how to use different parts of the website, such as adding a new guest or operating the front desk."
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Operational Status
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              defaultValue="The operational status section provides real-time updates on the status of various systems, including bot status and notifications."
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Add New Section
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              placeholder="Add new documentation here..."
            />
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Additional Documentation
          </Typography>
          <TextField
            multiline
            rows={12}
            fullWidth
            variant="outlined"
            placeholder="Write additional documentation here..."
            sx={{ mb: 2 }}
            defaultValue="Include any additional information or documentation that might be helpful for understanding and using the project."
          />
        </Box>

        <Button variant="contained" onClick={handleSaveDocumentation}>
          Save Documentation
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentationPage;
