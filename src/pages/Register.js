import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(username, name, email, password, age);
      navigate('/login');
    } catch (err) {
      setError(err.message || "Ошибка регистрации");
    }
  };

  return (
    <div className="h-screen w-full bg-[#F8F6FF] overflow-hidden">
      <div className="flex flex-col items-center mt-2">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xl mb-3">
          <span className="text-base">200×200</span>
        </div>
        <span className="text-3xl font-bold text-gray-800">GlowFlow</span>
      </div>
      <div className="bg-white rounded-2xl shadow-sm px-14 py-12 w-full max-w-lg mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-center">Регистрация</h2>
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-base font-medium text-gray-700">Имя пользователя</label>
            <input
              id="username"
              type="text"
              placeholder="Введите имя пользователя"
              className="px-5 py-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-200 text-lg"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base font-medium text-gray-700">Имя</label>
            <input
              id="name"
              type="text"
              placeholder="Введите ваше имя"
              className="px-5 py-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-200 text-lg"
              autoComplete="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-base font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="px-5 py-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-200 text-lg"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-base font-medium text-gray-700">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="Введите пароль"
              className="px-5 py-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-200 text-lg"
              autoComplete="new-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="age" className="text-base font-medium text-gray-700">Возраст</label>
            <input
              id="age"
              type="number"
              min="1"
              max="120"
              placeholder="Введите ваш возраст"
              className="px-5 py-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-200 text-lg"
              value={age}
              onChange={e => setAge(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-center text-base">{error}</div>}
          <button
            type="submit"
            className="mt-2 w-full py-4 rounded-lg bg-violet-700 text-white font-bold text-lg hover:bg-violet-800 transition"
          >
            Зарегистрироваться
          </button>
        </form>
        <button className="mt-6 text-violet-600 text-base hover:underline" type="button" onClick={() => navigate('/login')}>
          Уже есть аккаунт?
        </button>
      </div>
    </div>
  );
} 