import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-center items-center px-4 py-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-lg font-semibold hover:text-gray-400">Home</Link>
          <Link to="/register" className="text-white text-lg font-semibold hover:text-gray-400">Register</Link>
          <Link to="/login" className="text-white text-lg font-semibold hover:text-gray-400">Login</Link>
        </div>
      </div>
    </nav>
  );
}
