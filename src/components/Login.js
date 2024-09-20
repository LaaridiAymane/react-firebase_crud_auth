import { ThemeProvider } from "@emotion/react";
import { Avatar, Button, Container, CssBaseline, Grid, TextField, Typography, Link, Box } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Import LockOutlinedIcon
import { useNavigate } from "react-router-dom";
import React, { useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { createTheme } from "@mui/material";


const  defaultTheme = createTheme();

const Login = () =>{

        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            email: '',
            Password: ''
        });

        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setFormData({
                ...formData,
                [name]: value
            })
        }
        
        const handleSubmit = async (e) =>{
            e.preventDefault();
            console.log(formData);
            try {
                const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);
                console.log("Login successful" ,response)
                navigate("/dashboard");
            } catch(error){
                console.error(error.message)
            }
        }


        const handleSignupClick = () => {
            navigate("/register")
        }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    type="mail"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    autoComplete="password"
                                    onChange={handleInputChange}
                                    value={formData.password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit" // Corrigé ici
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Grid container >
                            <Grid item>
                                <Link variant="body2" onClick={handleSignupClick} >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;