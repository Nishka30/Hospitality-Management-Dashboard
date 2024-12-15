import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Onboarding from "./scenes/onboarding";
import Tutorial from "./scenes/tutorials";
import Documentation from "./scenes/documentation";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Team from "./scenes/userManage";
import Guests from "./scenes/guest";
import Rooms from "./scenes/rooms";
import NewUser  from "./scenes/newuser";
import FrontDesk from "./scenes/frontdesk";
import Feedback from "./scenes/feedback";
import Technical from "./scenes/techsupp";
import Food from "./scenes/food";
import TechAbout from "./scenes/techAbout";
import Bot from "./scenes/botStatus";
import Add from "./scenes/addnew";
// import Login from "./components/Login";
// import Register from "./components/Register";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [userName, setUserName] = useState(null); // Corrected here
  const location = useLocation();

  const noSidebarPaths = ["/login"]; // Removed "/register"
  const noTopbarPaths = ["/login"]; // Removed "/register"

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!noSidebarPaths.includes(location.pathname) && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!noTopbarPaths.includes(location.pathname) && (
              <Topbar userName={userName} setUser Name={setUserName} />
            )}
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirect to /dashboard */}
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/guest" element={<Guests />} />
              <Route path="/form" element={<Form />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/frontdesk" element={<FrontDesk />} />
              <Route path="/newuser" element={<NewUser  />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/tutorials" element={<Tutorial />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/techsupp" element={<Technical />} />
              <Route path="/techAbout" element={<TechAbout />} />
              <Route path="/userManage" element={<Team />} />
              <Route path="/botStatus" element={<Bot />} />
              <Route path="/food" element={<Food />} />
              <Route path="/addnew" element={<Add />} />
              {/* <Route path="/login" element={<Login setUser Name={setUser Name} />} />
              <Route path="/register" element={<Register setUser Name={setUser Name} />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;