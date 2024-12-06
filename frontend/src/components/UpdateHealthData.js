import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button, FormControl,FormLabel,FormControlLabel,RadioGroup,Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UpdateHealthData = () => {
  const [formData, setFormData] = useState({
    phone: '',
    height: '',
    weight: '',
    duration: '',
    diastolicBP: '',
    blood_sugar: '',
    body_temp: '',
    heart_rate: '',
  });
  const phone = localStorage.getItem('userPhone');
  const navigate = useNavigate();

  useEffect(() => {
    if (phone) {
      setFormData((prevData) => ({
        ...prevData,
        phone,
      }));
    }
  }, [phone]);

  const handleHealthChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update only the field being changed
    }));
  };

  const handleSaveUpdates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(response);
      if (response.ok) {
        alert('Health Data updated successfully');
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
        Update Health
      </Typography>

      <Paper elevation={3} sx={{ padding: '20px', mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Update Health Data
        </Typography>

            <TextField
              label="Height (cm)"
              variant="outlined"
              fullWidth
              name="height"
              value={formData.height}
              onChange={handleHealthChange}
            />
            <TextField
              label="Weight (kgs)"
              variant="outlined"
              fullWidth
              name="weight"
              value={formData.weight}
              onChange={handleHealthChange}
            />
            <TextField
              label="Duration (Weeks)"
              variant="outlined"
              fullWidth
              name="duration"
              value={formData.duration}
              onChange={handleHealthChange}
            />
             <TextField
              label="Diastolic BP"
              variant="outlined"
              fullWidth
              name="diastolicBP"
              value={formData.diastolicBP}
              onChange={handleHealthChange}
            />
             <TextField
              label="Blood Sugar"
              variant="outlined"
              fullWidth
              name="blood_sugar"
              value={formData.blood_sugar}
              onChange={handleHealthChange}
            />
             <TextField
              label="Body Temperature"
              variant="outlined"
              fullWidth
              name="body_temp"
              value={formData.body_tempS}
              onChange={handleHealthChange}
            />
             <TextField
              label="Heart Rate"
              variant="outlined"
              fullWidth
              name="heart_rate"
              value={formData.heart_rate}
              onChange={handleHealthChange}
            />
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

export {UpdateHealthData};
