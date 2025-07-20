    // frontend/admin/src/pages/Login/Login.jsx

    import React, { useState } from 'react';
    import './Login.css';
    import { useNavigate } from 'react-router-dom';
    import { toast } from 'react-toastify';
    import axios from 'axios';

    const Login = () => {
      const navigate = useNavigate();
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const backendUrl = "http://localhost:4000"; // Adjust this to your backend URL

      const handleLogin = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post(backendUrl + "/api/admin/login", { username, password });

          if (response.data.success) {
            localStorage.setItem('adminLoggedIn', 'true'); // Keep this flag for App.jsx routing
            localStorage.setItem('adminToken', response.data.token); // <--- CRITICAL: Store the admin token
            toast.success(response.data.message || "Admin Login Successful!");
            navigate('/orders');
          } else {
            toast.error(response.data.message || "Invalid Admin Credentials.");
          }
        } catch (error) {
          console.error("Error during admin login API call:", error);
          toast.error("An error occurred during login. Please try again.");
        }
      };

      return (
        <div className='admin-login-container'>
          <form onSubmit={handleLogin} className='admin-login-form'>
            <h2>Admin Login</h2>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                id='username'
                placeholder='Enter admin username'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Enter admin password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type='submit'>Login</button>
          </form>
        </div>
      );
    };

    export default Login;
    