import React, { useContext } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { DarkModeContext } from './contexts/ThemeContext';
import EachJob from './pages/EachJob';
import Error from './pages/Error404';
import './App.css'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './PrivateRoute';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import SavedJobs from './pages/SavedJobs';

function App() {
  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "bgLight" : "bgLight"}>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/home" element={<SearchPage />} />
        <Route exact path="/profile" element={<Profile />} />
        {<Route exact path="/edit" element={<EditProfile />}/>}
        <Route exact path="/saved" element={<SavedJobs />} />

        {/*            <Route exact path="/home" element={<PrivateRoute><JobPage /></PrivateRoute>} />
*/}
        <Route exact path="/job/:id" element={<EachJob />} />
        <Route exact={true} path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
