import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');

    let allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');

    const userExists = allUsers.some(user => user.email === email);

    if (userExists) {
      setErrorMessage('Аккаунт с таким email уже существует.');
      console.log('Ошибка регистрации: Аккаунт уже существует.');
      return;
    }

    const newUserData = {
      username,
      name,
      email,
      password,
      age,
      testPassed: false,
      skinTypeData: null,
    };

    allUsers.push(newUserData);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUserEmail', newUserData.email);
    window.dispatchEvent(new Event('loginStatusChanged'));
    console.log('Успешная регистрация для:', newUserData.email);
    navigate('/articles');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="https://via.placeholder.com/40" alt="GlowFlow Logo" className="h-10" />
          <span className="text-2xl font-semibold ml-2">GlowFlow</span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Имя пользователя
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="Введите имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Имя
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="Введите ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
              Возраст
            </label>
            <input
              type="number"
              id="age"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="Введите ваш возраст"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-purple-600 hover:text-purple-800 text-sm">
            Уже есть аккаунт?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
  