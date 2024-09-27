import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const MainSection: React.FC = () => {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const userEmail = localStorage.getItem('userEmail');
      setIsLoggedIn(!!userEmail);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <div className="text-center lg:text-left">
      <h1 className="text-4xl lg:text-6xl font-bold mb-4">
        start
        <span className={theme === 'dark' ? 'text-purple-500' : 'text-orange-500'}> streaming </span>
        games differently
      </h1>
      <p className="text-lg mb-6">
        gamor now has a
        <span className={theme === 'dark' ? 'text-purple-500' : 'text-orange-500'}> stream party </span>
        platform
      </p>
      {!isLoggedIn && (
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-full transition duration-300">
            Create account
          </button>
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
        </div>
      )}
    </div>
  );
};

export default MainSection;