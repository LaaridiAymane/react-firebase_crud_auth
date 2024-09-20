import { Button, Container, CssBaseline, Grid, TextField, Typography, Box } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React, { useEffect ,useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import {doc, getDoc, updateDoc} from "firebase/firestore";


const  defaultTheme = createTheme();
const UpdateUser = () =>{

    const {id} = useParams(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email: '',
        phone: ''
    });

    const fetchUser = async () => {
        try {
            const response = await getDoc(doc(db, "users", id));
            if (response.exists())
                setFormData(response.data());
            else
                console.log("No such document found!");
        }   catch (error) {
            console.error(error.message);
        }
    }


    useEffect(() => {
        fetchUser();
    },[id])

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
           const result = await updateDoc(doc(db, "users", id), formData);
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
                        Update User
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
                            Update User
                        </Button>
                       
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </>
    )
};

export default UpdateUser;