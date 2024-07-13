import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NewGuest from "@mui/icons-material/PersonAdd";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import RoomsOutlinedIcon from "@mui/icons-material/HouseOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"; // New icon for Operational Status
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"; // New icon for Notifications

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={React.cloneElement(icon, { style: { color: 'black' } })}
    >
      <Typography variant="h6">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SubItem = ({ title, to, selected, setSelected, isOpen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        paddingLeft: "40px",
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => setSelected(title)}
    >
      <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {isOpen ? (
          <ArrowDropUpIcon style={{ color: 'black', fontSize: 16 }} />
        ) : (
          <ArrowDropDownIcon style={{ color: 'black', fontSize: 16 }} />
        )}
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-sidebar-menu > .pro-menu-item": {
          color: colors.grey[100],
        },
        "& .pro-sidebar-menu .pro-sidebar-submenu > .pro-menu-item": {
          color: colors.grey[100],
        },
        "& .pro-sidebar-menu .pro-sidebar-submenu > .pro-sidebar-submenu-title": {
          color: "#ffffff !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon style={{ color: 'black' }} /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h6" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon style={{ color: 'black' }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/image.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Skepsi
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add New Guest"
              to="/newuser"
              icon={<NewGuest />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Frontdesk"
              to="/frontdesk"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Guests Management
            </Typography>
            
            <SubMenu
              title={
                <Typography variant="h6" color={"black"}>
                  Check-In Details
                </Typography>
              }
              icon={<ContactsOutlinedIcon style={{ color: 'black' }} />}
              selected={selected.startsWith("Customer Check-In Details")}
              isOpen={selected.startsWith("Customer Check-In Details")}
              onClick={() => setSelected("Customer Check-In Details")}
              style={{ fontSize: "13px" }}
            >
              <SubItem
                title="Customer Details"
                to="/contacts"
                selected={selected}
                setSelected={setSelected}
                isOpen={selected === "Customer Details"}
              />
              <SubItem
                title="Daily Check-in"
                to="/guest"
                selected={selected}
                setSelected={setSelected}
                isOpen={selected === "Daily Check-in"}
              />
            </SubMenu>

            <Item
              title="Rooms Details"
              to="/rooms"
              icon={<RoomsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu
              title={
                <Typography variant="h6" color={"black"}>
                  Accounts
                </Typography>
              }
              icon={<ReceiptOutlinedIcon style={{ color: 'black' }} />}
              selected={selected.startsWith("Accounts")}
              isOpen={selected.startsWith("Accounts")}
              onClick={() => setSelected("Accounts")}
            >
              <SubItem
                title="Invoices"
                to="/invoices"
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <Item
              title="Feedback"
              to="/feedback"
              icon={<FeedbackOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Team Management
            </Typography>
            
            <SubMenu
              title={
                <Typography variant="h6" color={"black"}>
                  Operational Status
                </Typography>
              }
              icon={<VisibilityOutlinedIcon style={{ color: 'black' }} />}
              selected={selected.startsWith("Operational Status")}
              isOpen={selected.startsWith("Operational Status")}
              onClick={() => setSelected("Operational Status")}
            >
              <SubItem
                title="Bot Status"
                to="/botStatus"
                selected={selected}
                setSelected={setSelected}
                isOpen={selected === "Bots Running"}
              />
              <SubItem
                title="Notifications"
                to="/notifications"
                selected={selected}
                setSelected={setSelected}
                isOpen={selected === "Notifications"}
              />
            </SubMenu>

            <Item
              title="Night Audit"
              to="/nightAudit"
              icon={<AssignmentTurnedInOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Food/Beverages"
              to="/food"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu
              title={
                <Typography variant="h6" color={"black"}>
                  Settings
                </Typography>
              }
              icon={<SettingsOutlinedIcon style={{ color: 'black' }} />}
              selected={selected.startsWith("Settings")}
              isOpen={selected.startsWith("Settings")}
              onClick={() => setSelected("Settings")}
            >
              <SubItem
                title="Admin"
                to="/admin"
                selected={selected}
                setSelected={setSelected}
                isOpen={selected === "Admin"}
              />
              <SubItem
                title="User Management"
                to="/userManage"
                selected={selected}
                setSelected={setSelected}
                isOpen={selected === "User Management"}
              />
            </SubMenu>

            <SubMenu
              title={
                <Typography variant="h6" color={"black"}>
                  Resources
                </Typography>
              }
              icon={<HelpOutlineOutlinedIcon style={{ color: 'black' }} />}
              selected={selected.startsWith("Resources")}
              isOpen={selected.startsWith("Resources")}
              onClick={() => setSelected("Resources")}
            >
              <SubItem
                title="Documentation"
                to="/documentation"
                selected={selected}
                setSelected={setSelected}
                isOpen={selected === "Documentation"}
              />
              <SubItem
                title="FAQ"
                to="/faq"
                selected={selected}
                setSelected={setSelected}
                isOpen={selected === "FAQ"}
              />
              <SubItem
                title="Onboarding & Training"
                to="/onboarding"
                selected={selected}
                setSelected={setSelected}
                isOpen={selected === "Onboarding"}
              />
              <SubItem
                title="Tutorials"
                to="/tutorials"
                selected={selected}
                setSelected={setSelected}
                isOpen={selected === "Tutorials"}
              />
            </SubMenu>

            <SubMenu
              title={
                <Typography variant="h6" color={"black"}>
                  Technical Support
                </Typography>
              }
              icon={<HelpOutlineOutlinedIcon style={{ color: 'black' }} />}
              selected={selected.startsWith("Technical Support")}
              isOpen={selected.startsWith("Technical Support")}
              onClick={() => setSelected("Technical Support")}
            >
              <SubItem
                title="About"
                to="/techAbout"
                selected={selected}
                setSelected={setSelected}
                isOpen={selected === "About"}
              />
            </SubMenu>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
