import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { DarkModeContext } from './contexts/ThemeContext';
import JobPage from './pages/JobPage';
import EachJob from './pages/EachJob';
import Error from './pages/Error404';
import './App.css'
function App() {
  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "bgDark" : "bgLight"}>
      <Routes>
        <Route exact path="/" element={<JobPage />} />
        <Route exact path="/job/:id" element={<EachJob />} />
        <Route exact={true} path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
