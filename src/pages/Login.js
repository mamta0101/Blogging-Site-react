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
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "../Services/userServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((show) => !show);

  const navigate = useNavigate()
  const refreshToken = localStorage.getItem("refreshToken");
  console.log(refreshToken)

  const handleSubmit = async (e) => {
    e.preventDefault();


{if (!email || !password) {
  toast.warn("fill all field", {
    position: "top-center",
    autoClose: 2000,
  });
} else {
  setLoading(true)
  let loginData ={
    email: email,
    password:password
  }

  try {
    const result = await login(loginData);
    localStorage.setItem("refreshToken", result.verificationToken);
    console.log('Login successful:', result);
    setLoading(false)
    navigate("/all-blogs")
    toast.success("login successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
    setEmail("");
    setPassword("");
  } catch (error) {
    console.error('Login failed:', error);
    setLoading(false)
    toast.error(error?.message, {
      position: "top-center",
      autoClose: 2000,
    });
    
  }
}}

  
  };


 

  return (
    <>
      <Box  sx={{bgcolor:'#000'}}>
        <Container
          sx={{
          height:'100vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}
          
        >
          <Card
            variant={"outlined"}
            component={"form"}
            sx={{ maxWidth: 350, width: "100%" }}
          >
            <CardContent>
              <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
            Login
          </Typography>
                <Grid container spacing={2}  p={3}>
                  <Grid item xs={12} md={12}>
                    <FormControl
                      sx={{ pb: 2, width: "100%" }}
                      variant="outlined"
                    >
                      <OutlinedInput
                        startAdornment={
                          <InputAdornment position="start">
                            <MailOutlineIcon />
                          </InputAdornment>
                        }
                        placeholder="Enter your email address"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={email}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControl sx={{ width: "100%" }} variant="outlined">
                      <OutlinedInput
                        startAdornment={
                          <InputAdornment position="start">
                            <LockOutlinedIcon />
                          </InputAdornment>
                        }
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment
                            sx={{ cursor: "pointer" }}
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </InputAdornment>
                        }
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        value={password}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Box p={3} >
                <Button
                onClick={handleSubmit}
                variant="contained"
                fullWidth
                sx={{bgcolor:'black'}}
              >
                
                {loading ? <CircularProgress size={20}/> : "Login"}
              </Button>
              </Box>
                  <Typography
                onClick={()=>navigate('/signup')}
                sx={{ cursor: "pointer", color: "#757575" , textAlign:'center'}}
              >
           
                Don't have account? Let's Create
               
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
