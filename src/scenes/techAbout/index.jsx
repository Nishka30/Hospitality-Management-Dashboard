import React from "react";
import { Box, Typography, Link, Container, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const AboutSection = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Container maxWidth="md">
      <Box
        p={4}
        boxShadow={3}
        borderRadius={2}
        bgcolor={colors.primary[400]}
        color={colors.grey[100]}
      >
        <Typography variant="h4" gutterBottom>
          About Hotel Management System
        </Typography>
        <Divider sx={{ mb: 2, backgroundColor: colors.greenAccent[200] }} />
        <Typography variant="body1" paragraph>
          Welcome to our Hotel Management System Admin Panel. This system is designed
          to streamline operations and enhance guest experiences at our hotel.
        </Typography>
        <Typography variant="body1" paragraph>
          For any inquiries or assistance, please contact our support team at{" "}
          <Link href="mailto:support@hotel.com" color={colors.greenAccent[200]} underline="hover">
            support@hotel.com
          </Link>.
        </Typography>
        <Typography variant="body1" paragraph>
          For immediate technical support, you can reach out to Skepsi at{" "}
          <Link href="mailto:techsupport@skepsi.ai" color={colors.greenAccent[200]} underline="hover">
            techsupport@skepsi.ai
          </Link>.
        </Typography>
        <Typography variant="body1">
          Learn more about our services and offerings on our{" "}
          <Link href="/services" color={colors.greenAccent[200]} underline="hover">
            Services Page
          </Link>.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutSection;
