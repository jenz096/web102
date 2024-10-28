import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
      <Link to="/" className="nav-link">Home</Link>
      </ul>
    </div>
    
  );
};

export default NavBar;
