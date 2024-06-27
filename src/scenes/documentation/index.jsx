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
          />
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
