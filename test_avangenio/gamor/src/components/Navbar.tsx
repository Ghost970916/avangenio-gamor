import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <nav className={`py-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold">Gamor</div>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-black-500">Home</Link>
            <Link to="#" className="text-gray-400">Streams</Link>
            <Link to="#" className="text-gray-400">Party</Link>
            <Link to="#" className="text-gray-400">Premium</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {userEmail ? (
            <>
              <span className="text-gray-400">{userEmail}</span>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 text-white ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'} rounded-full transition duration-300`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 ${
                  theme === 'dark'
                    ? 'text-white bg-transparent border border-gray-600 hover:bg-gray-700'
                    : 'text-black bg-white border border-gray-300 hover:bg-gray-100'
                } rounded-full transition duration-300`}
              >
                Sign in
              </Link>
              <button
                className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-full transition duration-300"
              >
                Create account
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;