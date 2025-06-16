import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedInStatus === 'true');

      const currentUserEmail = localStorage.getItem('currentUserEmail');
      if (loggedInStatus === 'true' && currentUserEmail) {
        const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const currentUser = allUsers.find(user => user.email === currentUserEmail);
        if (currentUser && currentUser.name) {
          setUserName(currentUser.name);
        } else {
          setUserName('Пользователь');
        }
      } else {
        setUserName('');
      }
    };

    checkLoginStatus();

    window.addEventListener('loginStatusChanged', checkLoginStatus);
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <header className="flex justify-between items-center px-16 py-8 border-b-2 border-gray-200 bg-white shadow-md text-3xl">
      <div className="text-4xl font-extrabold text-gray-800">
        <Link to="/">GlowFlow</Link>
      </div>
      <nav className="flex space-x-12">
        <Link to="/articles" className="px-8 py-4 rounded-2xl font-bold text-violet-700 hover:text-violet-900 transition text-2xl"
                                    style={{background: "#F8F6FF"}} >Статьи</Link>
        <Link to="/test" className="px-8 py-4 rounded-2xl font-bold text-violet-700 hover:text-violet-900 transition text-2xl"
                                    style={{background: "#F8F6FF"}}>Тест</Link>
        {isLoggedIn ? (
          <Link to="/profile" className="px-4 py-2 rounded-full bg-violet-100 flex items-center justify-center font-bold text-violet-700 text-2xl" style={{ width: '64px', height: '64px' }}>
            {userName ? userName.charAt(0).toUpperCase() : 'А'}
          </Link>
        ) : (
          <Link to="/login" className="px-8 py-4 rounded-2xl font-bold text-violet-700 hover:text-violet-900 transition text-2xl"
                                    style={{background: "#F8F6FF"}}>Войти</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
