
import React, { useState, useEffect } from 'react';
import { Paper,Button, Box,Typography, TextField, FormControl,FormLabel,FormControlLabel,RadioGroup,Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MedicalHistory = () => {
  const [formData, setFormData] = useState({
      phone: '',
      inducedAbortion: '',
      accidentalMiscarriage: '',
      stillBirth: '',
      neonatalDeath: '',
      congenitalAbnormality: { count: '', description: '' },
      pretermLabor: '',
      caesareanSection: '',
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

  const handleMedicalHistoryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  const handleSaveUpdates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/history/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(response);
      if (response.ok) {
        alert('Health History Data updated successfully');
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
    <Paper sx={{ padding: '16px', mb: 3 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Reproductive History
    </Typography>
<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
<FormControl component="fieldset" sx={{ mb: 2 }}>
 <FormLabel component="legend">Induced Abortion</FormLabel>
<RadioGroup
  row
  name="inducedAbortion"
  value={formData.inducedAbortion}
  onChange={handleMedicalHistoryChange}
 >
  <FormControlLabel value="0" control={<Radio />} label="0" />
  <FormControlLabel value="1" control={<Radio />} label="1" />
  <FormControlLabel value="2" control={<Radio />} label="2" />
  <FormControlLabel value="3" control={<Radio />} label="3" />
  <FormControlLabel value="moreThan3" control={<Radio />} label="More than 3" />
  </RadioGroup>
 </FormControl>

<FormControl component="fieldset" sx={{ mb: 2 }}>
 <FormLabel component="legend">Accidental Miscarriage</FormLabel>
<RadioGroup
  row
  name="accidentalMiscarriage"
  value={formData.accidentalMiscarriage}
  onChange={handleMedicalHistoryChange}
 >
  <FormControlLabel value="0" control={<Radio />} label="0" />
  <FormControlLabel value="1" control={<Radio />} label="1" />
  <FormControlLabel value="2" control={<Radio />} label="2" />
  <FormControlLabel value="3" control={<Radio />} label="3" />
  <FormControlLabel value="moreThan3" control={<Radio />} label="More than 3" />
  </RadioGroup>
 </FormControl>
 </Box>

<Typography variant="h6" sx={{ mb: 2 }}>
  Previous Child History
</Typography>

<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <FormControl component="fieldset" sx={{ mb: 2 }}>
    <FormLabel component="legend">Previous Neonatal Death</FormLabel>
    <RadioGroup
      row
      name="neonatalDeath"
      value={formData.neonatalDeath}
      onChange={handleMedicalHistoryChange}
    >
  <FormControlLabel value="0" control={<Radio />} label="0" />
  <FormControlLabel value="1" control={<Radio />} label="1" />
  <FormControlLabel value="2" control={<Radio />} label="2" />
  <FormControlLabel value="3" control={<Radio />} label="3" />
  <FormControlLabel value="moreThan3" control={<Radio />} label="More than 3" />
  </RadioGroup>
 </FormControl>

<FormControl component="fieldset" sx={{ mb: 2 }}>
 <FormLabel component="legend">Previous Stillbirth</FormLabel>
<RadioGroup
  row
  name="stillBirth"
  value={formData.stillBirth}
  onChange={handleMedicalHistoryChange}
 >
  <FormControlLabel value="0" control={<Radio />} label="0" />
  <FormControlLabel value="1" control={<Radio />} label="1" />
  <FormControlLabel value="2" control={<Radio />} label="2" />
  <FormControlLabel value="3" control={<Radio />} label="3" />
  <FormControlLabel value="moreThan3" control={<Radio />} label="More than 3" />
  </RadioGroup>
 </FormControl>
 </Box>

  <Typography variant="h6" sx={{ mb: 2 }}>
      Previous Baby with Congenital Abnormality
  </Typography>

  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <FormControl component="fieldset" sx={{ mb: 2 }}>
    <FormLabel component="legend">Abnormal Child Count</FormLabel>
    <RadioGroup
      row
      name="abnormalChildCount"
      value={formData.congenitalAbnormality.count}
      onChange={handleMedicalHistoryChange}
    >
  <FormControlLabel value="0" control={<Radio />} label="0" />
  <FormControlLabel value="1" control={<Radio />} label="1" />
  <FormControlLabel value="2" control={<Radio />} label="2" />
  <FormControlLabel value="3" control={<Radio />} label="3" />
  <FormControlLabel value="moreThan3" control={<Radio />} label="More than 3" />
  </RadioGroup>
 </FormControl>
 </Box>

    <TextField
      label="Description"
      variant="outlined"
      fullWidth
      name="congenitalAbnormality.description"
      value={formData.congenitalAbnormality.description}
      onChange={handleMedicalHistoryChange}
      sx={{ mb: 2 }}
    />

    <Typography variant="h6" sx={{ mb: 2 }}>
      Previous Labour History
    </Typography>

  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <FormControl component="fieldset" sx={{ mb: 2 }}>
    <FormLabel component="legend">Previous Preterm Labour</FormLabel>
    <RadioGroup
      row
      name="pretermLabour"
      value={formData.pretermLabor}
      onChange={handleMedicalHistoryChange}
    >
  <FormControlLabel value="0" control={<Radio />} label="0" />
  <FormControlLabel value="1" control={<Radio />} label="1" />
  <FormControlLabel value="2" control={<Radio />} label="2" />
  <FormControlLabel value="3" control={<Radio />} label="3" />
  <FormControlLabel value="moreThan3" control={<Radio />} label="More than 3" />
  </RadioGroup>
 </FormControl>

<FormControl component="fieldset" sx={{ mb: 2 }}>
 <FormLabel component="legend">Previous Caesarean Section</FormLabel>
<RadioGroup
  row
  name="caesareanSection"
  value={formData.caesareanSection}
  onChange={handleMedicalHistoryChange}
 >
  <FormControlLabel value="0" control={<Radio />} label="0" />
  <FormControlLabel value="1" control={<Radio />} label="1" />
  <FormControlLabel value="2" control={<Radio />} label="2" />
  <FormControlLabel value="3" control={<Radio />} label="3" />
  <FormControlLabel value="moreThan3" control={<Radio />} label="More than 3" />
  </RadioGroup>
 </FormControl>
 </Box>

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
    </Paper>
  );
};

export {MedicalHistory};
