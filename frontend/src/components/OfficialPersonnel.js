import React, { useState } from 'react';
import {
  Box, Button, Typography, Grid, Paper, Alert, List, ListItem, ListItemText,
} from '@mui/material';
import { HealthAndSafety, Report, Map, Settings } from '@mui/icons-material';
import { styled } from '@mui/system';

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

function OfficialPersonnel() {
  const [activeOption, setActiveOption] = useState('report');
  const [report, setReport] = useState("");
  const [riskAreas, setRiskAreas] = useState([]);

  // Dummy Data
  const areas = ["Area 1", "Area 2", "Area 3", "Area 4"];
  const highRiskAreas = ["Area 1", "Area 3"];

  const generateReport = () => {
    setReport("Report generated: High-Risk Areas Identified.");
  };

  const identifyRiskAreas = () => {
    setRiskAreas(highRiskAreas);
  };

  const handleSidebarClick = (option) => {
    setActiveOption(option);
    setReport("");
    setRiskAreas([]);
  };

  return (
    <Container>
      {/* Sidebar Section */}
      <Sidebar>
        <List>
          <SidebarItem onClick={() => handleSidebarClick('report')}>
            <Report sx={{ marginRight: '10px' }} />
            Generate Report
          </SidebarItem>
          <SidebarItem onClick={() => handleSidebarClick('risk')}>
            <HealthAndSafety sx={{ marginRight: '10px' }} />
            Identify Risk Areas
          </SidebarItem>
          <SidebarItem onClick={() => handleSidebarClick('areas')}>
            <Map sx={{ marginRight: '10px' }} />
            View All Areas
          </SidebarItem>
          <SidebarItem onClick={() => handleSidebarClick('settings')}>
            <Settings sx={{ marginRight: '10px' }} />
            Settings
          </SidebarItem>
        </List>
      </Sidebar>

      {/* Content Area Section */}
      <ContentArea>
        <Typography variant="h5" gutterBottom>Official Personnel Interface</Typography>

        {/* Generate Report */}
        {activeOption === 'report' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>Generate Report</SectionTitle>
            <ButtonStyled variant="contained" onClick={generateReport}>
              Generate Report
            </ButtonStyled>
            {report && <Alert severity="info" sx={{ mt: 2 }}>{report}</Alert>}
          </Box>
        )}

        {/* Identify Risk Areas */}
        {activeOption === 'risk' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>Identify Risk Areas</SectionTitle>
            <ButtonStyled variant="contained" onClick={identifyRiskAreas}>
              Identify Risk Areas
            </ButtonStyled>

            {riskAreas.length > 0 && (
              <Grid container spacing={2} sx={{ mt: 3 }}>
                {riskAreas.map((area, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper sx={{ padding: '16px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                      <CardTitle>{area}</CardTitle>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* View All Areas */}
        {activeOption === 'areas' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>All Areas</SectionTitle>
            <Grid container spacing={2}>
              {areas.map((area, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
                    <Typography>{area}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Settings Section (Future Feature) */}
        {activeOption === 'settings' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle>Settings</SectionTitle>
            <Typography>This section will allow you to configure settings for the Official Personnel Interface.</Typography>
          </Box>
        )}
      </ContentArea>
    </Container>
  );
}

export default OfficialPersonnel;

