// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-natureGreen p-4 flex items-center justify-between">
      <div className="text-cream font-bold text-2xl">
        <Link to="/">NatureHub</Link>
      </div>

      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="p-2 rounded-lg border border-earthBrown focus:outline-none w-1/2"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/" className="text-cream">Home</Link>
        <Link to="/create" className="text-cream">Create New Post</Link>
      </div>
    </nav>
  );
};

export default Navbar;
