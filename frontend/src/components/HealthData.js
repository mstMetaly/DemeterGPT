import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShowHealthData = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const phone = localStorage.getItem('userPhone');

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchProfileData = async () => {     
      try {
        const response = await fetch("http://localhost:5000/api/health/get", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone }),
        });
        const xml = await response.json();
        const data = xml.data;
        console.log(data);
        setProfileData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);


  // Navigate to the update page
  const handleUpdateClick = () => {
    navigate('/updateHealthData');
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Paper sx={{ padding: '16px', mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Health Information
        </Typography>
        <Typography><strong>Height:</strong> {profileData.height}</Typography>
        <Typography><strong>Weight:</strong> {profileData.weight}</Typography>
        <Typography><strong>Duration:</strong> {profileData.duration}</Typography>
      </Paper>



      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateClick}
        sx={{
          fontWeight: 'bold',
          backgroundColor: '#1976d2',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#1565c0',
            boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        Update Profile
      </Button>
    </div>
  );
};

export {ShowHealthData};
