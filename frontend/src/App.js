import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import HealthWorker from './components/HealthWorker';
import Mother from './components/Mother';
import Profile from './components/Profile';
import {ShowProfile} from './components/ShowProfile';
import OfficialPersonnel from './components/OfficialPersonnel';
import Login from './components/Login'; // Add this import
import { UpdateHealthData } from './components/UpdateHealthData';
import { ShowHealthData } from './components/HealthData';
import { Emergency } from './components/Emergency';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <Routes>
          {/* Login page */}
          <Route path="/" element={<Login />} />
          
          {/* Role-based homepages */}
          <Route path="/health-worker" element={<HealthWorker />} />
          <Route path="/mother" element={<Mother />} />
          <Route path="/official-personnel" element={<OfficialPersonnel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ShowProfile" element={<ShowProfile />} />
          <Route path="/updateHealthData" element={<UpdateHealthData />} />
          <Route path="/healthData" element={<ShowHealthData />} />
          <Route path='/emergency'  element={<Emergency />} />
          

          {/* Add a default welcome page */}
          <Route path="/" element={<h1>Welcome to the Rural Pregnancy App</h1>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
