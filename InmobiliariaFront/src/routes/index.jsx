import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register/Register';

function HandleRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default HandleRoutes;
