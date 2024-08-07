import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout"; // Import Logout icon
import { logout } from "../../auth"; // Import logout function

const Topbar = ({ userName, setUserName }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const handleLogout = () => {
    logout(); // Call your logout function here
    setUserName(null); // Clear the username state
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex" alignItems="center">
        {userName && (
          <IconButton onClick={handleLogout} title="Logout">
            <PersonOutlinedIcon /> {/* Use PersonOutlinedIcon for logout */}
          </IconButton>
        )}
        {!userName && (
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;