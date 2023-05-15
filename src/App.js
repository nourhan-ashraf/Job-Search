import './App.css';
import JobPage from './pages/JobPage';
import EachJob from './pages/EachJob';
import Error from './pages/Error404';
import {
  Routes,
  Route,
} from "react-router-dom";
import { DarkModeContext } from './contexts/ThemeContext';
import { useContext } from 'react';

function App() {
  const {darkMode, toggleModes} = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "bgDark" : "bgLight"}>
      <Routes>
        <Route exact path="/" element={<JobPage />} />
        <Route exact path="/job/:id" element={<EachJob />} />
        <Route exact={true}  path="/*" element={<Error />} />


      </Routes>
    </div>
  );
}

export default App;
