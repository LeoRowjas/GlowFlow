import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await adminLogin(password);
      navigate('/admin/dashboard'); // Перенаправление на страницу админ-панели
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F5FF]">
      <div className="mb-16 flex items-center justify-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-medium rounded-sm">40x40</div>
        <h2 className="text-4xl font-semibold text-gray-700">GF.ADMIN_PANEL</h2>
      </div>
      <div className="bg-white p-16 rounded-xl shadow-md w-[48rem] text-center">
        <h1 className="text-4xl font-bold mb-12 text-gray-800">Добро пожаловать, Админ</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-8 text-left">
            <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-4">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 text-xl"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-base italic mb-8">{error}</p>}
          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline w-full text-xl"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 