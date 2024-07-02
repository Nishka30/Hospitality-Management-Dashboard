import React from "react";
import { Box, Typography, Link } from "@mui/material";

const AboutSection = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        About Hotel Management System
      </Typography>
      <Typography variant="body1" mb={2}>
        Welcome to our Hotel Management System Admin Panel. This system is designed
        to streamline operations and enhance guest experiences at our hotel.
      </Typography>
      <Typography variant="body1" mb={2}>
        For any inquiries or assistance, please contact our support team at{" "}
        <Link href="mailto:support@hotel.com">support@hotel.com</Link>.
      </Typography>
      <Typography variant="body1">
        Learn more about our services and offerings on our{" "}
        <Link href="/services">Services Page</Link>.
      </Typography>
    </Box>
  );
};

export default AboutSection;
