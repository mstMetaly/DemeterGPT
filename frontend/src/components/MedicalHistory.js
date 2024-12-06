import React, { useState } from 'react';
import { Paper, Box,Typography, TextField, FormControlLabel, Checkbox, Button, FormControl,FormLabel,RadioGroup,Radio} from '@mui/material';

const MedicalHistory = () => { 
  const [medicalHistoryData, setMedicalHistory] = useState({
    inducedAbortion: '',
    accidentalMiscarriage: '',
    stillBirth: '',
    neonatalDeath: '',
    congenitalAbnormality: { count: '', description: '' },
    pretermLabor: '',
    caesareanSection: '',
  });

  const [isDiseaseDropdownOpen, setIsDiseaseDropdownOpen] = useState(false);
  const [isSurgeryDropdownOpen, setIsSurgeryDropdownOpen] = useState(false);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedPreviousSurgery, setSelectedPreviousSurgery] = useState([]);

  const diseasesList = [
    'Diabetes',
    'Hypertension',
    'Tuberculosis',
    'Pyelonephritis',
    'Thyroid Disorder',
    'Cardiac Disease',
    'Epilepsy',
    'Viral Hepatitis',
    'Preeclampsia',
    'Anaemia',
    'HIV',
  ];

  const surgeryList = [
    'Myomectomy',
    'complete perinatal tear',
    'vesicovaginal fistula',
    'stress incontinence',
  ];

  const handleMedicalHistoryChange = (e) => {
    const { name, value } = e.target;
    setMedicalHistory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDiseaseChange = (disease) => {
    setSelectedDiseases((prev) =>
      prev.includes(disease)
        ? prev.filter((item) => item !== disease)
        : [...prev, disease]
    );
  };
  

  const handleSurgeryChange = (surgery) => {
    setSelectedPreviousSurgery((prev) =>
      prev.includes(surgery)
        ? prev.filter((item) => item !== surgery)
        : [...prev, surgery]
    );
  };


  const handleDiseaseOkClick = () => {
    setIsDiseaseDropdownOpen(false);
  };

  const handleSurgeryOkClick = () => {
    setIsSurgeryDropdownOpen(false);
  };
  const handleSaveAndNavigate = () => {
    localStorage.setItem('medicalHistory', JSON.stringify(medicalHistoryData));
    localStorage.setItem('selectedDiseases', JSON.stringify(selectedDiseases));
    localStorage.setItem('selectedPreviousSurgery', JSON.stringify(selectedPreviousSurgery));
    
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
    value={medicalHistoryData.inducedAbortion}
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
    value={medicalHistoryData.accidentalMiscarriage}
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
        value={medicalHistoryData.neonatalDeath}
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
    value={medicalHistoryData.stillBirth}
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
        value={medicalHistoryData.congenitalAbnormality.count}
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
        value={medicalHistoryData.congenitalAbnormality.description}
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
        value={medicalHistoryData.pretermLabor}
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
    value={medicalHistoryData.caesareanSection}
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

<Typography variant="h6" sx={{ mb: 2 }}>Diseases</Typography>
      <Button
        variant="outlined"
        onClick={() => setIsDiseaseDropdownOpen(!isDiseaseDropdownOpen)}
        sx={{ mb: 2 }}
      >
        {isDiseaseDropdownOpen ? "Hide" : "Select Diseases"}
      </Button>

      {isDiseaseDropdownOpen && (
        <Box sx={{ pl: 2, pt: 1 }}>
          {diseasesList.map((disease, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedDiseases.includes(disease)}
                  onChange={() => handleDiseaseChange(disease)}
                />
              }
              label={disease}
            />
          ))}
          <Button
            variant="contained"
            onClick={handleDiseaseOkClick}
            sx={{ mt: 2 }}
          >
            OK
          </Button>
        </Box>
      )}

      {selectedDiseases.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Selected Diseases:</Typography>
          <Typography variant="body1">{selectedDiseases.join(", ")}</Typography>
        </Box>
      )}

<Typography variant="h6" sx={{ mb: 2 }}>Previous Surgery History</Typography>
      <Button
        variant="outlined"
        onClick={() => setIsSurgeryDropdownOpen(!isSurgeryDropdownOpen)}
        sx={{ mb: 2 }}
      >
        {isSurgeryDropdownOpen ? "Hide" : "Select Previous Surgery"}
      </Button>

      {isSurgeryDropdownOpen && (
        <Box sx={{ pl: 2, pt: 1 }}>
          {surgeryList.map((surgery, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedPreviousSurgery.includes(surgery)}
                  onChange={() => handleSurgeryChange(surgery)}
                />
              }
              label={surgery}
            />
          ))}
          <Button
            variant="contained"
            onClick={handleSurgeryOkClick}
            sx={{ mt: 2 }}
          >
            OK
          </Button>
        </Box>
      )}

      {selectedPreviousSurgery.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Selected Previous Surgery:</Typography>
          <Typography variant="body1">{selectedPreviousSurgery.join(", ")}</Typography>
        </Box>
      )}
        <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleSaveAndNavigate}
      >
        Save and View Summary
      </Button>
    </Paper>
  );
};

const SummaryPage = () => {
  const [medicalHistoryData, setMedicalHistoryData] = useState(() => {
    const data = localStorage.getItem('medicalHistory');
    return data ? JSON.parse(data) : {};
  });

  const [selectedDiseases, setSelectedDiseases] = useState(() => {
    const data = localStorage.getItem('selectedDiseases');
    return data ? JSON.parse(data) : [];
  });

  const [selectedPreviousSurgery, setSelectedPreviousSurgery] = useState(() => {
    const data = localStorage.getItem('selectedPreviousSurgery');
    return data ? JSON.parse(data) : [];
  });

  const handleUpdate = () => {
    localStorage.setItem('medicalHistory', JSON.stringify(medicalHistoryData));
    localStorage.setItem('selectedDiseases', JSON.stringify(selectedDiseases));
    localStorage.setItem('selectedPreviousSurgery', JSON.stringify(selectedPreviousSurgery));
    alert('Information updated successfully!');
  };

  return (
    <Paper sx={{ padding: '16px', mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        Medical History Summary
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Reproductive History</Typography>
        <Typography>Induced Abortion: {medicalHistoryData.inducedAbortion}</Typography>
        <Typography>Accidental Miscarriage: {medicalHistoryData.accidentalMiscarriage}</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Diseases</Typography>
        <Typography>{selectedDiseases.join(', ') || 'No diseases selected'}</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Previous Surgeries</Typography>
        <Typography>{selectedPreviousSurgery.join(', ') || 'No surgeries selected'}</Typography>
      </Box>

      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Save Updates
      </Button>
    </Paper>
  );
};

export { MedicalHistory, SummaryPage };
