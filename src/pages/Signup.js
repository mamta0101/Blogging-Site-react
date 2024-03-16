import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { VerifyOtp, signUp } from '../Services/userServices';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((show) => !show);

 

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    let user ={
      username:name,
      email: email,
      password:password,
      role:"admin"
     
    }
if(name || email || password ){
    try {
        const result = await signUp(user);
        console.log('User Created successfully:', result);
        setLoading(false)
        navigate("/")
        toast.success("User Created successfully!", {
            position: "top-center",
            autoClose: 2000,
          });
        setEmail("");
        setPassword("");
        setName("");
      } catch (error) {
        console.error('signup failed:', error);
        setLoading(false)   
        toast.error(error?.message, {
            position: "top-center",
            autoClose: 2000,
          });  
      }
    }else{
        toast.warning("please fill all details", {
            position: "top-center",
            autoClose: 2000,
          });  
          setLoading(false)
    }
  
}
   



  return (
    <Container
    maxWidth
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#000',

      }}
    >
      <Card
        variant="outlined"
        sx={{ width: 350, maxWidth: '100%', padding: 2 }}
      >
      
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    }
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    }
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </Grid>
        
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment
                        sx={{ cursor: 'pointer' }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </InputAdornment>
                    }
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{bgcolor:'black'}}
              >
                
                {loading ? <CircularProgress size={20}/> : "Sign Up"}
              </Button>
            </Box>
          </form>
          <Typography
                onClick={()=>navigate('/')}
                sx={{ cursor: "pointer", color: "#757575" , textAlign:'center', mt:2}}
              >
           
                Already have an account;
               
              </Typography>
        </CardContent>
       

      </Card>
    </Container>
  );
}

export default Signup;