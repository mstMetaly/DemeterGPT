import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Button, TextField, Box, Typography, Grid, Paper, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/background.jpg';


// Styled components
const Container = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
}));

const LoginCard = styled(Paper)(() => ({
  padding: '32px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent for readability
  maxWidth: '400px',
  width: '100%',
}));

const ButtonStyled = styled(Button)(() => ({
  backgroundColor: '#00796b',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#004d40',
  },
  borderRadius: '8px',
  padding: '10px 16px',
  width: '100%',
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#00796b',
  marginBottom: '20px',
}));

function Login() {
  const [password, setPassword] = useState('');
  const [phoneNumber,setphoneNumber] = useState('');
  const [openSignUp, setOpenSignUp] = useState(false);
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      alert('Please fill out all fields');
      return;
    }
  
    const loginData = {
      phone: phoneNumber,
      password: password,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      const result = await response.json();
  
      if (response.status === 200) {
         localStorage.setItem('userPhone', phoneNumber);
          alert('Login successful');
          navigate('/mother');
  
      } else {
        alert(`Error: ${result.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Failed to log in. Please try again.');
    }
  };
  


  const handleSignUp = async () => {
      if (!signUpPhone || !signUpPassword ||!confirmPassword) {
        alert('Please fill out all fields');
        return;
      }
      if (signUpPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    
      const userData = {
        phone: signUpPhone,
        password: signUpPassword,
      };
    
      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
    
        const result = await response.json();
    
        if (response.ok) {
          alert('Successful account creation');
          setOpenSignUp(false);
          setSignUpPhone('');
          setSignUpPassword('');
          setConfirmPassword('');
        } else {
          alert(`Error: ${result.message ||'Something went wrong'}`);
        }
      } catch (error) {
        console.error('Error creating account:', error);
    
    alert('Failed to create account. Please try again.');
      }
    };

  return (
    <Container>
      <LoginCard>
        <SectionTitle>Login</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              type="number"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <ButtonStyled onClick={handleLogin}>Login</ButtonStyled>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              onClick={() => setOpenSignUp(true)}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </LoginCard>

      {/* Sign-Up Modal */}
      <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <TextField
            label="Phone Number"
            fullWidth
            value={signUpPhone}
            onChange={(e) => setSignUpPhone(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <ButtonStyled onClick={handleSignUp} sx={{ mb: 2 }}>
            Sign Up
          </ButtonStyled>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            onClick={() => setOpenSignUp(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default Login;

