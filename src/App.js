import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Onboarding from "./scenes/onboarding";
import Tutorial from "./scenes/tutorials";
import Documentation from "./scenes/documentation";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Guests from "./scenes/guest";
import Rooms from "./scenes/rooms";
import NewUser from "./scenes/newuser";
import FrontDesk from "./scenes/frontdesk";

function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/guest" element={<Guests />} />
              <Route path="/form" element={<Form />} />
              {/* <Route path="/bar" element={<Bar />} /> */}
              <Route path="/pie" element={<Pie />} />
              <Route path="/frontdesk" element={<FrontDesk />} />
              <Route path="/newuser" element={<NewUser />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/tutorials" element={<Tutorial />} />
              <Route path="/dcumentation" element={<Documentation/>} />
              {/* <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
