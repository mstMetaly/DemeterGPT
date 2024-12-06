import React, { useState,useEffect } from 'react';
import { Paper, Typography, TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    phone: '',
    name: '',
    age: '',
    emergencyContact: '',
    village: '',
    upazilla: '',
    postOffice: '',
    district: '',
    division: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const phone = localStorage.getItem('userPhone');
    if (phone) {
      setProfileData((prevData) => ({
        ...prevData,
        phone,
      }));
    }
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value, // Update only the field being changed
    }));
  };

  const handleSaveUpdates = async () => {
    
    try {
      const response = await fetch('http://localhost:5000/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();
      console.log(response);
      if (response.ok) {
        alert('Profile updated successfully');
        localStorage.setItem('age', profileData.age);
        navigate('/mother');
      } else {
        alert(`Error: ${result.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
   
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        Update Profile
      </Typography>

      <Paper elevation={3} sx={{ padding: '20px', mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Basic Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              name="age"
              value={profileData.age}
              onChange={handleProfileChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Emergency Contact"
              variant="outlined"
              fullWidth
              name="emergencyContact"
              value={profileData.emergencyContact}
              onChange={handleProfileChange}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: '20px', mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Address Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Village/Ward"
              variant="outlined"
              fullWidth
              name="village"
              value={profileData.village}
              onChange={handleProfileChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Upazilla"
              variant="outlined"
              fullWidth
              name="upazilla"
              value={profileData.upazilla}
              onChange={handleProfileChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Post Office"
              variant="outlined"
              fullWidth
              name="postOffice"
              value={profileData.postOffice}
              onChange={handleProfileChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="District"
              variant="outlined"
              fullWidth
              name="district"
              value={profileData.district}
              onChange={handleProfileChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Division"
              variant="outlined"
              fullWidth
              name="division"
              value={profileData.division}
              onChange={handleProfileChange}
            />
          </Grid>
        </Grid>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSaveUpdates}
        sx={{
          fontWeight: 'bold',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        Save Updates
      </Button>
    </div>
  );
};

export default Profile;


