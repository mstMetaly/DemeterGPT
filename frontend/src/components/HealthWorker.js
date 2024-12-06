import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, Grid, TextField, Paper, Snackbar, Alert, Select, MenuItem, FormControl,
  InputLabel, LinearProgress
} from '@mui/material';
import { styled } from '@mui/system';
import { CalendarToday, Contacts, HealthAndSafety, LocalHospital, SyncAlt, Assignment, Person, Chat, FileUpload } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { CSVLink } from 'react-csv';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

// Styled Components for Sidebar and Content Area
const Container = styled(Box)({
  display: 'flex',
  height: '100vh',
  backgroundColor: '#f5f5f5',
});

const Sidebar = styled(Box)({
  width: '250px',
  backgroundColor: '#00796b',
  color: '#fff',
  paddingTop: '20px',
  boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)',
  height: '100vh',
  paddingLeft: '20px',
  paddingRight: '20px',
});

const SidebarItem = styled(Paper)({
  padding: '15px',
  color: '#fff',
  backgroundColor: '#00796b',
  '&:hover': {
    backgroundColor: '#004d40',
    cursor: 'pointer',
  },
  borderRadius: '8px',
  marginBottom: '10px',
});

const ContentArea = styled(Box)({
  flex: 1,
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.1)',
  overflowY: 'auto',
});

const SectionTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#00796b',
});

const ButtonStyled = styled(Button)({
  backgroundColor: '#00796b',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#004d40',
  },
  borderRadius: '8px',
  padding: '10px 16px',
  width: '100%',
});

const CardTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '8px',
});

const CardContent = styled(Box)({
  backgroundColor: '#ffffff',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

function HealthWorker() {
  const [activeOption, setActiveOption] = useState('dataEntry');
  const [healthData, setHealthData] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [alert, setAlert] = useState('');
  const [highRisk, setHighRisk] = useState(false);
  const [offlineData, setOfflineData] = useState([]);
  const [patients, setPatients] = useState([
    { id: 1, name: 'Jane Doe', pregnancyStage: 'First Trimester', riskStatus: 'High Risk' },
    { id: 2, name: 'Emily Clark', pregnancyStage: 'Second Trimester', riskStatus: 'Low Risk' },
  ]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState('en');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Real-Time Notifications Simulation
  const notifyUpcomingAppointments = () => {
    setAlert('You have upcoming appointments.');
  };

  useEffect(() => {
    const interval = setInterval(notifyUpcomingAppointments, 3600000); // Check every hour
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleDataEntry = (e) => setHealthData(e.target.value);
  const handleAppointmentChange = (e) => setAppointmentDate(e.target.value);
  const handlePatientChange = (e) => setSelectedPatient(e.target.value);

  const handleSaveData = () => {
    if (navigator.onLine) {
      setAlert('Data saved successfully!');
      setOfflineData([]);
    } else {
      setOfflineData([...offlineData, healthData]);
      setAlert('You are offline. Data will sync when you are connected.');
    }
    setHealthData('');
  };

  const scheduleHomeVisit = () => {
    setAlert(`Appointment scheduled for ${appointmentDate}`);
    setAppointmentDate('');
  };

  const toggleRiskStatus = () => {
    setHighRisk(!highRisk);
  };

  const syncOfflineData = () => {
    setAlert('Syncing offline data...');
    setOfflineData([]);
  };

  const handleSidebarClick = (option) => {
    setActiveOption(option);
    setAlert('');
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  // Health Data Analytics (Charts & Reports)
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Health Data (e.g., Weight)',
        data: [68, 70, 72, 74],
        fill: false,
        borderColor: '#00796b',
        tension: 0.1,
      },
    ],
  };

  return (
    <Container>
      {/* Sidebar Section */}
      <Sidebar>
        <SidebarItem onClick={() => handleSidebarClick('dataEntry')}>
          <Person sx={{ marginRight: '10px' }} />
          Data Entry
        </SidebarItem>
        <SidebarItem onClick={() => handleSidebarClick('schedule')}>
          <CalendarToday sx={{ marginRight: '10px' }} />
          Home Visit Scheduling
        </SidebarItem>
        <SidebarItem onClick={() => handleSidebarClick('highRisk')}>
          <HealthAndSafety sx={{ marginRight: '10px' }} />
          High-Risk Pregnancies
        </SidebarItem>
        <SidebarItem onClick={() => handleSidebarClick('sync')}>
          <SyncAlt sx={{ marginRight: '10px' }} />
          Sync Offline Data
        </SidebarItem>
        <SidebarItem onClick={() => handleSidebarClick('pregnancyStage')}>
          <Assignment sx={{ marginRight: '10px' }} />
          Pregnancy Stage Tracker
        </SidebarItem>
        <SidebarItem onClick={() => handleSidebarClick('appointments')}>
          <LocalHospital sx={{ marginRight: '10px' }} />
          Upcoming Appointments
        </SidebarItem>
        <SidebarItem onClick={() => handleSidebarClick('chat')}>
          <Chat sx={{ marginRight: '10px' }} />
          Communication & Notes
        </SidebarItem>
        <SidebarItem onClick={() => handleSidebarClick('dataExport')}>
          <FileUpload sx={{ marginRight: '10px' }} />
          Export Data (CSV/Excel)
        </SidebarItem>
      </Sidebar>

      {/* Content Area Section */}
      <ContentArea>
        <Typography variant="h5" gutterBottom>Health Worker Interface</Typography>

        {/* Data Entry */}
        {activeOption === 'dataEntry' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>Enter Health Data</SectionTitle>
            <TextField 
              label="Enter Health Data" 
              variant="outlined" 
              fullWidth 
              value={healthData} 
              onChange={handleDataEntry} 
              margin="normal"
            />
            <ButtonStyled onClick={handleSaveData}>
              Save Data
            </ButtonStyled>
            {alert && <Alert severity="success" sx={{ mt: 2 }}>{alert}</Alert>}
          </Box>
        )}

        {/* Home Visit Scheduling */}
        {activeOption === 'schedule' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>Schedule Home Visit</SectionTitle>
            <TextField
              type="date"
              label="Appointment Date"
              variant="outlined"
              fullWidth
              value={appointmentDate}
              onChange={handleAppointmentChange}
              margin="normal"
            />
            <ButtonStyled onClick={scheduleHomeVisit}>
              Schedule Appointment
            </ButtonStyled>
            {alert && <Alert severity="success" sx={{ mt: 2 }}>{alert}</Alert>}
          </Box>
        )}

        {/* High-Risk Pregnancies */}
        {activeOption === 'highRisk' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>High-Risk Pregnancies</SectionTitle>
            <Button 
              variant="outlined" 
              onClick={toggleRiskStatus} 
              sx={{ mt: 2, mb: 2 }}
            >
              {highRisk ? 'Show All' : 'Show High-Risk Only'}
            </Button>
            <Grid container spacing={2}>
              {patients.filter(patient => highRisk ? patient.riskStatus === 'High Risk' : true).map((patient, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper sx={{ padding: '16px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                    <CardTitle>{patient.name}</CardTitle>
                    <Typography>{patient.riskStatus}</Typography>
                    <Typography>{patient.pregnancyStage}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Sync Offline Data */}
        {activeOption === 'sync' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>Sync Offline Data</SectionTitle>
            {offlineData.length > 0 ? (
              <ButtonStyled onClick={syncOfflineData}>
                Sync Offline Data
              </ButtonStyled>
            ) : (
              <Typography>No offline data to sync.</Typography>
            )}
          </Box>
        )}

        {/* Pregnancy Stage Tracker */}
        {activeOption === 'pregnancyStage' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>Pregnancy Stage Tracker</SectionTitle>
            <FormControl fullWidth>
              <InputLabel>Stage</InputLabel>
              <Select
                value={selectedPatient}
                onChange={handlePatientChange}
                label="Stage"
              >
                {patients.map((patient, index) => (
                  <MenuItem key={index} value={patient.name}>{patient.name} - {patient.pregnancyStage}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Upcoming Appointments */}
        {activeOption === 'appointments' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>Upcoming Appointments</SectionTitle>
            <Grid container spacing={2}>
              {patients.map((patient, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CardContent>
                    <CardTitle>{patient.name}</CardTitle>
                    <Typography>Next Appointment: {patient.pregnancyStage === 'First Trimester' ? '12 weeks' : 'Checkup'}</Typography>
                  </CardContent>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Communication & Notes */}
        {activeOption === 'chat' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>Communication & Notes</SectionTitle>
            <TextField
              label="Notes"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
            />
            <ButtonStyled onClick={() => setAlert("Note saved!")}>Save Note</ButtonStyled>
          </Box>
        )}

        {/* Data Export (CSV/Excel) */}
        {activeOption === 'dataExport' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>Export Patient Data</SectionTitle>
            <CSVLink data={patients} filename="patients_data.csv">
              <ButtonStyled>
                Export as CSV
              </ButtonStyled>
            </CSVLink>
          </Box>
        )}

        {/* Health Data Analytics */}
        {activeOption === 'analytics' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>Health Data Analytics</SectionTitle>
            <Line data={chartData} />
          </Box>
        )}
      </ContentArea>
    </Container>
  );
}

export default HealthWorker;

