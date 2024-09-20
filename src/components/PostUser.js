import { Button, Container, CssBaseline, Grid, TextField, Typography, Box } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {collection, addDoc} from "firebase/firestore";
 
const  defaultTheme = createTheme();
const PostUser = () =>{

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email: '',
        phone: ''
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
            const result = await addDoc(collection(db, "users"), formData);
            console.log(result);
            navigate("/dashboard");
        } catch(error){
            console.error(error.message)
        }
    }


    

    return(
       <>
         <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 18,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                
                    <Typography component="h1" variant="h5">
                        Add User
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    autoComplete="given-name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="firstName"
                                    autoFocus
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                     name="lastName"
                                    autoComplete="family-name"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="lastName"
                                    autoFocus
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    autoComplete="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    type="mail"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                   name="phone"
                                   autoComplete="phone number"
                                   required
                                   fullWidth
                                   id="phone"
                                   label="phone number"
                                   type="text"
                                   value={formData.phone}
                                   onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit" 
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Add User
                        </Button>
                       
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
       </>
    )
};

export default PostUser;