import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dahboard";
import { useAuth } from './hooks/useAuth';
import { Navigate } from 'react-router-dom';
import PostUser from './components/PostUser';
import UpdateUser from './components/UpdateUser';
import { AuthProvider } from './hooks/useAuth';
function App() {

  const PrivateRoute = ({ element }) => {
    const { currentUser } = useAuth();
    return currentUser ? element : <Navigate to="/login"/>
  }



  return (
   <>
    <Routes>
    <Route path="/" element={<Navigate to="/login" />} />

      <Route path='/register' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />}/>}></Route>
      <Route path='/user' element={<PrivateRoute element={<PostUser />}/>}></Route>
      <Route path='/user/:id/edit' element={<PrivateRoute element={<UpdateUser />}/>}></Route>
    </Routes>
   </>
  );
}

export default App;
