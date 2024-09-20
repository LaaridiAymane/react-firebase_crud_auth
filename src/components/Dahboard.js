import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from "../firebase";
import Paper from '@mui/material/Paper';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';


const Dashboard = () => {

        const navigate = useNavigate();
        const [users, setUsers] = useState([]);

        const fetchUsers = async () => {
            const response = await getDocs(collection(db, "users"));
            const userList = response.docs.map(doc => ({ id: doc.id, ...doc.data()}));
            setUsers(userList);
        }


        useEffect(() => {
            fetchUsers();
        },[])

        const handlePostNewUser = () => {
            navigate("/user");
        }

        const handleUpdateUser = (id) => {
            navigate(`/user/${id}/edit`);
        }


        const handleDeleteUser= async (id) => {
            try {
                await deleteDoc(doc(db,'users',id));
                fetchUsers();
            } catch (error){
                console.error(error);
            }
        }

        const handleLogout = async () => {
            try {
                await signOut(auth)
                navigate("/login")
            } catch (error){
                console.error(error);
            }
        }


        return (
           <TableContainer component ={Paper}>
            <Box sx={{ display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' , margin: 2}}>
                <Button 
                    variant="contained"
                    color="success"
                    onClick={handlePostNewUser}
                >
                    <AddIcon/> Add New User
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleLogout}
                >
                    <LogoutIcon/> Logout
                </Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow />
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Action</TableCell>
                    <TableRow />
                </TableHead>
                <TableBody>
                    {users.length === 0 ?(
                        <TableRow>
                            <TableCell colSpan={5} sx={{ textAlign: 'center' }}> No users found</TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                 <Button 
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleUpdateUser(user.id)}
                                    sx={{ marginLeft: 1}}
                                  >
                                        <EditIcon />
                                 </Button>
                                 
                                 <Button 
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDeleteUser(user.id)}
                                    sx={{ marginLeft: 1}}
                                  >
                                        <DeleteIcon />
                                 </Button>

                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
           </TableContainer>
        )
}


export default Dashboard;