// frontend/admin/src/App.jsx

import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Login from './pages/Login/Login';
import { ToastContainer, toast } from 'react-toastify'; // Keep ToastContainer and toast import
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000"; // Your backend URL (using localhost for development)
   //  const url = "https://foodie-backend-t7kv.onrender.com"; 
//  const url = "http://localhost:4000"; for local
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  React.useEffect(() => {
    // Only navigate if not logged in AND trying to access a protected route
    // The toast message will now be handled by the Login component or specific action failures.
    if (!isAdminLoggedIn && location.pathname !== '/admin-login') {
      navigate('/admin-login');
    }
  }, [isAdminLoggedIn, navigate, location.pathname]);

  return (
    <div className='app'>
      <ToastContainer /> {/* ToastContainer remains here to display toasts from other components */}

      <Routes>
        <Route path="/admin-login" element={<Login />} />

        {isAdminLoggedIn ? (
          <Route path="/*" element={
            <>
              <Navbar />
              <hr />
              <div className='app-content'>
                <Sidebar />
                <Routes>
                  <Route path="add" element={<Add url={url} />} />
                  <Route path="list" element={<List url={url} />} />
                  <Route path="orders" element={<Orders url={url} />} />
                  <Route path="/" element={<Orders url={url} />} />
                </Routes>
              </div>
            </>
          } />
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
