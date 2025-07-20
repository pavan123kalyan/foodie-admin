// frontend/admin/src/components/Navbar/Navbar.jsx

import React from 'react';
import './Navbar.css'; // Ensure this CSS file is correctly linked
import { assets } from '../../assets/assets' // Assuming assets includes profile_icon and logout_icon
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming toast is available

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn'); // Clear the admin login flag
    toast.success("Logged out successfully.");
    navigate('/admin-login'); // Redirect to admin login page
  };

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Admin Logo" />
      
      <div className='navbar-profile'> {/* Container for profile icon and dropdown */}
        <img className='profile' src={assets.profile_image} alt="Profile Icon" /> {/* Use profile_icon from assets */}
        <ul className='nav-profile-dropdown'>
          <li onClick={handleLogout}>
            <img src={assets.logout_icon} alt="Logout Icon" /> {/* Use logout_icon from assets */}
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;