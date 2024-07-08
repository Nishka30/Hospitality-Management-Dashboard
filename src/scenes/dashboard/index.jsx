import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import House from "@mui/icons-material/House";
import Arrival from "@mui/icons-material/PersonAdd";
import Room from "@mui/icons-material/DoorBack";
import Luggage from "@mui/icons-material/Luggage";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import PieChart from "../../components/PieChart";
import { Link } from "react-router-dom";
import LineChart from "../../components/LineChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalGuests, setTotalGuests] = useState(0);
  const [expectedArrivals, setExpectedArrivals] = useState(0);
  const [expectedDepartures, setExpectedDepartures] = useState(0);
  const [endOfDayTotalGuests, setEndOfDayTotalGuests] = useState(0); // State for end of day total guests

  const currentStatusData = [
    { section: "Start of the Day", rooms: 100, pax: 250, percent: "50%" },
    { section: "Realized Arrivals", rooms: 10, pax: 20, percent: "10%" },
    { section: "Realized Departures", rooms: 5, pax: 12, percent: "5%" },
    { section: "End of the Day", rooms: 105, pax: 258, percent: "51%" },
  ];

  useEffect(() => {
    const fetchTotalGuests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/totalGuests');
        const totalGuests = response.data.totalGuests;
        setTotalGuests(totalGuests);
      } catch (error) {
        console.error('Error fetching total guests:', error);
      }
    };

    const fetchExpectedArrivals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');
        const customers = response.data;

        // Calculate today's date in yyyy-mm-dd format
        const today = new Date().toISOString().slice(0, 10);

        // Filter customers whose checkinDate matches today's date
        const filteredCustomers = customers.filter(customer => {
          return customer.checkinDate.slice(0, 10) === today;
        });

        // Calculate total guests arriving today
        let totalArrivals = 0;
        filteredCustomers.forEach(customer => {
          totalArrivals += customer.totalGuests || 0;
        });

        // Update state with total guests arriving today
        setExpectedArrivals(totalArrivals);
      } catch (error) {
        console.error('Error fetching expected arrivals:', error);
      }
    };

    const fetchExpectedDepartures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');
        const customers = response.data;

        // Calculate today's date in yyyy-mm-dd format
        const today = new Date().toISOString().slice(0, 10);

        // Filter customers whose checkoutDate matches today's date
        const filteredCustomers = customers.filter(customer => {
          return customer.checkoutDate.slice(0, 10) === today;
        });

        // Calculate total guests departing today
        let totalDepartures = 0;
        filteredCustomers.forEach(customer => {
          totalDepartures += customer.totalGuests || 0;
        });

        // Update state with total guests departing today
        setExpectedDepartures(totalDepartures);
      } catch (error) {
        console.error('Error fetching expected departures:', error);
      }
    };

    const calculateEndOfDayTotalGuests = () => {
      // Calculate end of day total guests
      const endOfDayTotal = totalGuests + expectedArrivals - expectedDepartures;
      setEndOfDayTotalGuests(endOfDayTotal);
    };

    fetchTotalGuests();
    fetchExpectedArrivals();
    fetchExpectedDepartures();
    calculateEndOfDayTotalGuests();
  }, [totalGuests, expectedArrivals, expectedDepartures]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          {/* Link to navigate to the Add New Guest form */}
          <Link to="/newuser">
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Book Now
            </Button>
          </Link>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mb="-20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          color={colors.grey[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
        >
          <StatBox
            title={totalGuests}
            subtitle="Current In-House Guests"
            progress="0.75"
            increase="+14%"
            icon={<House sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          color={colors.grey[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
        >
          <StatBox
            title={expectedArrivals}
            subtitle="Expected Arrivals Today"
            progress="0.82"
            increase="+21%"
            icon={<Arrival sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          color={colors.grey[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
        >
          <StatBox
            title={expectedDepartures}
            subtitle="Expected Departures Today"
            progress="0.30"
            increase="+5%"
            icon={<Room sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          color={colors.grey[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
        >
          <StatBox
            title={endOfDayTotalGuests}
            subtitle="End of Day Total Guests"
            progress="0.80"
            increase="-1%"
            icon={<Luggage sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          borderRadius={2}
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          mb="20px"
          height="250px"
        >
          {/* Current Status Table */}
          <Box
            backgroundColor={colors.primary[400]}
            borderRadius={2}
            p="20px"
          >
            <Typography variant="h5" fontWeight="600" mb="10px">
              Current Status
            </Typography>
            <Box>
              <Box
                display="flex"
                p="10px"
                borderBottom={`2px solid ${colors.primary[500]}`}
              >
                <Box flex="2">
                  <Typography variant="subtitle1" fontWeight="600">
                    Section
                  </Typography>
                </Box>
                <Box flex="1">
                  <Typography variant="subtitle1" fontWeight="600">
                    Rooms
                  </Typography>
                </Box>
                <Box flex="1">
                  <Typography variant="subtitle1" fontWeight="600">
                    Pax
                  </Typography>
                </Box>
                <Box flex="1">
                  <Typography variant="subtitle1" fontWeight="600">
                    Percent
                  </Typography>
                </Box>
              </Box>
              {currentStatusData.map((data, index) => (
                <Box
                  key={index}
                  display="flex"
                  p="10px"
                  borderBottom={`1px solid ${colors.grey[500]}`}
                >
                  <Box flex="2">
                    <Typography variant="body1">{data.section}</Typography>
                  </Box>
                  <Box flex="1">
                    <Typography variant="body1">{data.rooms}</Typography>
                  </Box>
                  <Box flex="1">
                    <Typography variant="body1">{data.pax}</Typography>
                  </Box>
                  <Box flex="1">
                    <Typography variant="body1">{data.percent}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          color={colors.grey[100]}
          borderRadius={2}
          p="20px"
        >
          <Typography variant="h5" fontWeight="600" mb="10px">
            Services
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 4 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          color={colors.grey[100]}
          borderRadius={2}
          p="20px"
        >
          <Typography variant="h5" fontWeight="600" mb="10px">
            Guest Activities
          </Typography>
          <Box height="250px" mt="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
