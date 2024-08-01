import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register/Register';
import Navbar from '../components/navbar/Navbar';

function HandleRoutes() {
  return (
    <>  
    <Router>
    <Navbar></Navbar>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
}

export default HandleRoutes;
