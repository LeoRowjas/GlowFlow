import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function Test() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6FF]">
        <div className="bg-white rounded-2xl shadow-md px-16 py-16 max-w-2xl w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6 text-center">Добро пожаловать в тест по определению типа кожи</h2>
          <p className="text-gray-600 text-center mb-10 text-lg">
            Для прохождения теста необходимо войти в аккаунт. Это позволит нам сохранить ваши результаты и предоставить персональные рекомендации.
          </p>
          <button
            className="px-10 py-4 rounded-lg bg-violet-700 text-white font-bold text-lg hover:bg-violet-800 transition"
            onClick={() => navigate('/login')}
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  // Для авторизованного пользователя — приветственный экран теста
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6FF]">
      <div className="bg-white rounded-2xl shadow-md px-16 py-16 max-w-2xl w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-center">Добро пожаловать в тест по определению типа кожи</h2>
        <div className="text-gray-600 text-center mb-10 text-lg">
          Мы поможем вам узнать ваш тип кожи и подберём персональные рекомендации по уходу. Тест займёт всего 2–3 минуты.<br /><br />
          В тесте 5 простых вопросов о вашей коже<br />
          Отвечайте максимально честно для получения точного результата
        </div>
        <button
          className="px-10 py-4 rounded-lg bg-violet-700 text-white font-bold text-lg hover:bg-violet-800 transition"
          onClick={() => {}}
        >
          Начать тест
        </button>
      </div>
    </div>
  );
}
  