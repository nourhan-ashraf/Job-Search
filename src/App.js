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
import PrivateRouteSign from './PrivateRouteSign';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import SavedJobs from './pages/SavedJobs';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { darkMode } = useContext(DarkModeContext)
  const { user } = useAuth()
  return (
    <div className={darkMode ? "bgLight" : "bgLight"}>
      <Routes>
        <Route exact path="/:id" element={<PrivateRouteSign><MainPage /></PrivateRouteSign>} />
        <Route exact path="/" element={<PrivateRouteSign><MainPage /></PrivateRouteSign>} />

        <Route exact path="/signup" element={<PrivateRouteSign><SignUp /></PrivateRouteSign>} />
        <Route exact path="/signin" element={<PrivateRouteSign><SignIn /></PrivateRouteSign>} />
        <Route exact path="/home" element={<PrivateRouteSign><SearchPage /></PrivateRouteSign>} />
        <Route exact path="/home/:id" element={<PrivateRoute><SearchPage /></PrivateRoute>} />


        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/edit/:id" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route exact path="/saved/:id" element={<PrivateRoute><SavedJobs /></PrivateRoute>} />

        <Route exact path="/job/:id" element={<EachJob />} />
        <Route exact={true} path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
