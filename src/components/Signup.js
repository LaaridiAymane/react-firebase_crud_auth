import { ThemeProvider } from "@emotion/react";
import { Avatar, Button, Container, CssBaseline, Grid, TextField, Typography, Link, Box } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Import LockOutlinedIcon
import defaultTheme from '../theme/defaultTheme'; // Assurez-vous que ce chemin est correct
import { useNavigate } from "react-router-dom";
import React, { useState} from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";




const Signup = () => {


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
            const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("Signup successful" ,response)
            navigate("/login");
        } catch(error){
            console.error(error.message)
        }
    }


    const handleSigninClick = () => {
        navigate("/login")
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
                        Sign Up
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
                                    label="password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
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
                            Sign Up 
                        </Button>
                        <Grid container >
                            <Grid item>
                                <Link variant="body2" onClick={handleSigninClick}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Signup;
