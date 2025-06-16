import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const user = allUsers.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUserEmail', user.email);
      window.dispatchEvent(new Event('loginStatusChanged'));
      console.log('Успешный вход для:', user.email);
      navigate('/articles');
    } else {
      setErrorMessage('Неверная почта или пароль.');
      console.log('Ошибка входа: Неверные данные.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="https://via.placeholder.com/40" alt="GlowFlow Logo" className="h-10" /> {/* Замените на реальный логотип */}
          <span className="text-2xl font-semibold ml-2">GlowFlow</span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">С возвращением!</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="young@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMessage && <p className="text-red-500 text-xs italic mt-2">{errorMessage}</p>}
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
          >
            Войти
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/register" className="text-purple-600 hover:text-purple-800 text-sm">
            Ещё нет аккаунта?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
  