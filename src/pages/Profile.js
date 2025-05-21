import React from "react";
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-0 px-0">
      <div className="w-full bg-white rounded-3xl shadow-lg flex p-9 gap-9 my-12 overflow-hidden">
        <div className="basis-[24%] max-w-[24%] flex flex-col items-center">
          <div className="w-72 h-72 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-3xl mb-6">
            200 × 200
          </div>
          <div className="text-2xl font-bold mb-3">{user.name}</div>
          <div className="w-full rounded-2xl px-9 py-9 mb-9" style={{ background: "#F8F6FF" }}>
            <div className="text-gray-700 space-y-6 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">Возраст:</span>
                <span className="font-semibold">{user.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Тип кожи:</span>
                <span className="font-semibold">{user.skinType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Эл. почта:</span>
                <span className="font-semibold">{user.email}</span>
              </div>
            </div>
          </div>
          <button onClick={logout} className="w-full py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-bold text-lg transition">
            Выйти
          </button>
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-16 text-lg">
          <div className="rounded-2xl border p-9 mb-12" style={{ background: "#F8F6FF" }}>
            <h2 className="text-2xl font-bold mb-6">Анализ состояния кожи</h2>
            <div className="mb-3">
              <span className="font-semibold">Основные проблемы: </span>
              <div className="flex flex-wrap gap-3 mt-3">
                {user.skinAnalysis?.problems?.map((problem) => (
                  <span
                    key={problem}
                    className="inline-block px-6 py-2 rounded-full text-lg font-medium"
                    style={{ background: "#FFFFFF", color: "#2563eb" }}
                  >
                    {problem}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-semibold">Необходимый уход: </span>
              <div className="flex flex-wrap gap-3 mt-3">
                {user.skinAnalysis?.care?.map((care) => (
                  <span
                    key={care}
                    className="inline-block px-6 py-2 rounded-full text-lg font-medium"
                    style={{ background: "#FFFFFF", color: "#2563eb" }}
                  >
                    {care}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Персональные рекомендации</h2>
            <div className="grid grid-cols-2 gap-9">
              {user.recommendations?.map((rec, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 rounded-xl shadow p-6 flex flex-col transition hover:shadow-lg hover:bg-gray-200 cursor-pointer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={rec.img}
                    alt={rec.title}
                    className="rounded-lg mb-3 object-cover w-full h-40"
                  />
                  <div className="font-bold text-lg mb-2">{rec.title}</div>
                  <div className="text-gray-600 text-base">{rec.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
