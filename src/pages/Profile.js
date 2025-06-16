import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const mockUserData = {
  name: "Alexandra Smith",
  age: 28,
  email: "example@gmail.com",
  skinType: "Комбинированная",
};

const mockSkinAnalysis = {
  problems: ["Обезвоженность", "Расширенные поры", "Неравномерный тон"],
  care: ["Глубокое увлажнение", "Защита от солнца", "Мягкое отшелушивание"],
};

const mockRecommendations = [
  {
    title: "Очищающий гель CeraVe",
    description: "Нежное очищение для комбинированной кожи",
    img: "https://via.placeholder.com/366x160?text=366+x+160",
  },
  {
    title: "Увлажняющий крем La Roche-Posay",
    description: "Лёгкий крем с гиалуроновой кислотой",
    img: "https://via.placeholder.com/366x160?text=366+x+160",
  },
  {
    title: "Солнцезащитный крем Beauty of Joseon",
    description: "SPF 50+ PA++++",
    img: "https://via.placeholder.com/366x160?text=366+x+160",
  },
  {
    title: "Ночная маска COSRX",
    description: "Восстанавливающая маска с центеллой",
    img: "https://via.placeholder.com/366x160?text=366+x+160",
  },
  {
    title: "Тоник Pyunkang Yul",
    description: "Успокаивающий тоник для чувствительной кожи",
    img: "https://via.placeholder.com/366x160?text=366+x+160",
  },
  {
    title: "Сыворотка The Ordinary",
    description: "С ниацинамидом для сужения пор",
    img: "https://via.placeholder.com/366x160?text=366+x+160",
  },
  {
    title: "Крем Bioderma Sensibio",
    description: "Для чувствительной и реактивной кожи",
    img: "https://via.placeholder.com/366x160?text=366+x+160",
  },
  {
    title: "Гель Holika Holika Aloe",
    description: "Многофункциональный гель с алоэ вера",
    img: "https://via.placeholder.com/366x160?text=366+x+160",
  },
  {
    title: "Пенка Missha Super Aqua",
    description: "Глубокое очищение и увлажнение",
    img: "https://via.placeholder.com/366x160?text=366+x+160",
  },
  {
    title: "Маска Laneige Water Sleeping Mask",
    description: "Ночная маска для интенсивного увлажнения",
    img: "https://via.placeholder.com/366x160?text=366+x+160",
  },
];

const PAGE_SIZE = 4;

export default function Profile() {
  const [recommendations, setRecommendations] = useState(mockRecommendations.slice(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (recommendations.length >= mockRecommendations.length) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setRecommendations((prev) => {
              const next = mockRecommendations.slice(0, (page + 1) * PAGE_SIZE);
              return next;
            });
            setPage((prev) => prev + 1);
            setLoading(false);
          }, 700); // имитация задержки
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, recommendations.length, page]);

  return (
    <div className="min-h-screen bg-gray-100 py-0 px-0">
      <div className="w-full bg-white rounded-3xl shadow-lg flex p-9 gap-9 my-12 overflow-hidden">
        {/* Левая колонка */}
        <div className="basis-[24%] max-w-[24%] flex flex-col items-center">
          <div className="w-72 h-72 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-3xl mb-6">
            200 × 200
          </div>
          <div className="text-2xl font-bold mb-3">{mockUserData.name}</div>
          {/* Блок с данными пользователя */}
          <div
            className="w-full rounded-2xl px-9 py-9 mb-9"
            style={{ background: "#F8F6FF" }}
          >
            <div className="text-gray-700 space-y-6 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">Возраст:</span>
                <span className="font-semibold">{mockUserData.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Тип кожи:</span>
                <span className="font-semibold">{mockUserData.skinType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Эл. почта:</span>
                <span className="font-semibold">{mockUserData.email}</span>
              </div>
            </div>
          </div>
          <button className="w-full py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-bold text-lg transition">
            Выйти
          </button>
        </div>
        {/* Правая часть */}
        <div className="flex-1 min-w-0 flex flex-col gap-16 text-lg">
          {/* Анализ состояния кожи */}
          <div
            className="rounded-2xl border p-9 mb-12"
            style={{ background: "#F8F6FF" }}
          >
            <h2 className="text-2xl font-bold mb-6">Анализ состояния кожи</h2>
            <div className="mb-3">
              <span className="font-semibold">Основные проблемы: </span>
              <div className="flex flex-wrap gap-3 mt-3">
                {mockSkinAnalysis.problems.map((problem) => (
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
                {mockSkinAnalysis.care.map((care) => (
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
          {/* Персональные рекомендации */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Персональные рекомендации</h2>
            <div className="grid grid-cols-2 gap-9">
              {recommendations.map((rec, idx) => (
                <Link
                  key={idx}
                  to={`/product/${idx + 1}`}
                  className="bg-gray-100 rounded-xl shadow p-6 flex flex-col transition hover:shadow-lg hover:bg-gray-200 cursor-pointer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={rec.img}
                    alt={rec.title}
                    className="rounded-lg mb-3 object-cover w-full h-56"
                  />
                  <div className="font-bold text-lg mb-2">{rec.title}</div>
                  <div className="text-gray-600 text-base">{rec.description}</div>
                </Link>
              ))}
            </div>
            <div ref={loaderRef} className="w-full flex justify-center py-4">
              {loading && <span className="text-violet-500">Загрузка...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
