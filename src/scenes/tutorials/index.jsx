import React, { useState } from 'react';
import { Box, Typography, Button, InputBase, useTheme, Collapse } from '@mui/material';
import { tokens } from '../../theme';

const videos = {
  'QUICK OVERVIEW': [
    { title: 'Introduction to Frontdesk', url: 'https://www.youtube.com/watch?v=example1' },
    { title: 'Frontdesk Basics', url: 'https://www.youtube.com/watch?v=example2' },
  ],
  'SINGLE RESERVATION VIDEOS': [
    { title: 'Making a Single Reservation', url: 'https://www.youtube.com/watch?v=example3' },
    { title: 'Editing a Reservation', url: 'https://www.youtube.com/watch?v=example4' },
  ],
  'ROOM OPERATIONS VIDEOS': [
    { title: 'Room Cleaning Process', url: 'https://www.youtube.com/watch?v=example5' },
    { title: 'Maintenance Requests', url: 'https://www.youtube.com/watch?v=example6' },
  ],
  'GROUP RESERVATION VIDEOS': [
    { title: 'Handling Group Reservations', url: 'https://www.youtube.com/watch?v=example7' },
    { title: 'Special Requests for Groups', url: 'https://www.youtube.com/watch?v=example8' },
  ],
  'PAYMENTS & BILLING VIDEOS': [
    { title: 'Processing Payments', url: 'https://www.youtube.com/watch?v=example9' },
    { title: 'Billing Issues', url: 'https://www.youtube.com/watch?v=example10' },
  ],
};

const Widget = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openSections, setOpenSections] = useState({});

  const handleToggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.blueAccent[100],
        p: 6,
        borderRadius: '8px',
        boxShadow: 3,
        maxWidth: 'md',
        mx: 'auto',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" color={colors.grey[800]}>
          Video List
        </Typography>
        <Button
          sx={{ color: colors.redAccent[500], fontSize: '1.25rem' }}
          onClick={() => {/* handle close action */}}
        >
          &times;
        </Button>
      </Box>
      <InputBase
        placeholder="Search Video"
        sx={{
          width: '100%',
          p: 2,
          mb: 4,
          border: `1px solid ${colors.grey[300]}`,
          borderRadius: '8px',
          color: 'white',
          outline: 'none',
          '&:focus': {
            borderColor: colors.blueAccent[500],
            boxShadow: `0 0 5px ${colors.blueAccent[500]}`,
          },
        }}
        inputProps={{ style: { color: 'white' } }}
      />
      <Typography variant="h6" color={colors.blueAccent[700]} mb={4}>
        FRONTDESK OPERATIONS
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {Object.keys(videos).map((section) => (
          <div key={section}>
            <Button
              fullWidth
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors.grey[700],
                color: 'white',
                p: 2,
                borderRadius: '8px',
                mb: 1,
              }}
              onClick={() => handleToggleSection(section)}
            >
              <span>{section}</span>
              <span className="text-xl">{openSections[section] ? '-' : '+'}</span>
            </Button>
            <Collapse in={openSections[section]}>
              <Box sx={{ pl: 2, pt: 1 }}>
                {videos[section].map((video, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" color="white">
                      {video.title}
                    </Typography>
                    <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ color: colors.blueAccent[500], textDecoration: 'none' }}>
                      Watch Video
                    </a>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Widget;
