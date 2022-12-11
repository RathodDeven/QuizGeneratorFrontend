import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { useState } from 'react';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  
  // const [user, setUser] = useState(null);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
      <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
      <Routes>
        <Route index element={<Home />} />
          
        <Route path='*' element={<Error />} />
      </Routes>
      </main>
      </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
