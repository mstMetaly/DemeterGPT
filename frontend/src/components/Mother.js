//new 
import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Person, HealthAndSafety, CalendarToday, LocalDining, Contacts, Settings, Notifications } from '@mui/icons-material';
import {MedicalHistory} from './MedicalHistory'; 
import {ShowProfile} from './ShowProfile';
import {DietChart} from './DietChart';
import {UpdateHealthData} from './UpdateHealthData';
import {ShowHealthData} from './HealthData'// Import the MedicalHistory component

// Sidebar styles
const Sidebar = {
  width: '250px',
  backgroundColor: '#00796b',
  color: '#fff',
  paddingTop: '20px',
  boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)',
  height: '100vh',
  position: 'fixed',
};

const SidebarItem = {
  padding: '15px',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#004d40',
    cursor: 'pointer',
  },
};

const ContentArea = {
  marginLeft: '250px',
  padding: '20px',
  backgroundColor: '#fff',
  overflowY: 'auto',
};

const MainTitle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#00796b',
};

// Main component for Mother
const Mother = () => {
  const [activeOption, setActiveOption] = useState('profile'); // State to switch between sidebar options

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <Box style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box sx={Sidebar}>
        <List>
          <ListItem button sx={SidebarItem} onClick={() => handleOptionClick('profile')}>
            <Person sx={{ marginRight: '10px' }} />
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button sx={SidebarItem} onClick={() => handleOptionClick('medicalHistory')}>
            <HealthAndSafety sx={{ marginRight: '10px' }} />
            <ListItemText primary="Medical History" />
          </ListItem>
          <ListItem button sx={SidebarItem} onClick={() => handleOptionClick('risk')}>
            <HealthAndSafety sx={{ marginRight: '10px' }} />
            <ListItemText primary="Risk Analysis" />
          </ListItem>
          <ListItem button sx={SidebarItem} onClick={() => handleOptionClick('showHealthData')}>
            <CalendarToday sx={{ marginRight: '10px' }} />
            <ListItemText primary="Health Data" />
          </ListItem>
          <ListItem button sx={SidebarItem} onClick={() => handleOptionClick('healthData')}>
            <CalendarToday sx={{ marginRight: '10px' }} />
            <ListItemText primary=" Update Health Data" />
          </ListItem>
          <ListItem button sx={SidebarItem} onClick={() => handleOptionClick('schedule')}>
            <CalendarToday sx={{ marginRight: '10px' }} />
            <ListItemText primary="Vaccination Schedule" />
          </ListItem>
          <ListItem button sx={SidebarItem} onClick={() => handleOptionClick('diet')}>
            <LocalDining sx={{ marginRight: '10px' }} />
            <ListItemText primary="Diet Chart" />
          </ListItem>
          <ListItem button sx={SidebarItem} onClick={() => handleOptionClick('contacts')}>
            <Contacts sx={{ marginRight: '10px' }} />
            <ListItemText primary="Emergency Contacts" />
          </ListItem>
          <ListItem button sx={SidebarItem} onClick={() => handleOptionClick('settings')}>
            <Settings sx={{ marginRight: '10px' }} />
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button sx={SidebarItem} onClick={() => handleOptionClick('notifications')}>
            <Notifications sx={{ marginRight: '10px' }} />
            <ListItemText primary="Notifications" />
          </ListItem>
        </List>
      </Box>

      {/* Content Area */}
      <Box sx={ContentArea}>
        <Typography variant="h4" sx={MainTitle}>
          {activeOption === 'profile' ? 'Your Profile' :
            activeOption === 'medicalHistory' ? 'Medical History' : 
            activeOption === 'showHealthData'? 'Show Health Data' :
            activeOption === 'healthData'? 'Update Health Data' :
            activeOption === 'risk' ? 'Risk Analysis' :
            activeOption === 'schedule' ? 'Vaccination Schedule' :
            activeOption === 'diet' ? 'Diet Chart' :
            activeOption === 'contacts' ? 'Emergency Contacts' :
            activeOption === 'settings' ? 'Settings' :
            activeOption === 'notifications' ? 'Notifications' : 'Mother Profile'}
        </Typography>

        {/* Profile Section */}
        {activeOption === 'profile' && <ShowProfile />}

        {/* Medical History Section */}
        {activeOption === 'medicalHistory' && <MedicalHistory />}
          {/* Medical History Section */}
        {activeOption === 'diet' && <DietChart />}
        {activeOption === 'healthData' && <UpdateHealthData />}
        {activeOption === 'showHealthData' && <ShowHealthData />}
      </Box>
    </Box>
  );
};

export default Mother;
