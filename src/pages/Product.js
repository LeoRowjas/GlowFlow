import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products"; // Импортируем данные продуктов

const TABS = ["Описание", "Состав", "Характеристики"];

export default function Product() {
  const { id } = useParams(); // Получаем id продукта из URL
  const productId = parseInt(id, 10); // Преобразуем id в число

  const product = products.find((p) => p.id === productId); // Ищем продукт по id

  const [activeTab, setActiveTab] = useState("Описание"); // Устанавливаем вкладку "Описание" по умолчанию
  const [isFavorite, setIsFavorite] = useState(product ? product.isFavorite : false);

  // Если продукт не найден, можно отобразить сообщение об ошибке или перенаправить
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-6 flex items-center justify-center">
        <div className="text-center text-2xl font-bold text-gray-700">
          Продукт не найден.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6FF] py-12 px-6">
      <div className="w-full max-w-[1800px] min-h-[80vh] mx-auto bg-white rounded-2xl shadow-lg flex p-24 gap-24">
        {/* Левая часть — изображение */}
        <div className="w-[800px] flex-shrink-0 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-xl object-cover w-[760px] h-[760px] bg-gray-200"
            style={{ maxHeight: '90vh', maxWidth: '100%' }}
          />
        </div>
        {/* Правая часть — информация */}
        <div className="flex-1 flex flex-col justify-center text-[1.35rem]">
          {/* Верхняя фиксированная часть: название, описание, избранное */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <h1 className="text-4xl font-bold mr-4">
                {product.title}
              </h1>
              <button
                className="ml-4 text-violet-500 hover:text-violet-700 text-3xl focus:outline-none"
                title={isFavorite ? "Убрать из избранного" : "В избранное"}
                onClick={() => setIsFavorite((f) => !f)}
              >
                {isFavorite ? "♥" : "♡"}
              </button>
            </div>
            <div className="text-gray-600 text-2xl">{product.description}</div>
          </div>
          {/* Табы и их содержимое */}
          <div className="flex flex-col flex-1">
            <div className="flex gap-8 mb-8 border-b border-gray-200">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 pb-3 text-2xl font-semibold transition border-b-4 ${
                    activeTab === tab
                      ? "border-violet-500 text-violet-600"
                      : "border-transparent text-gray-500 hover:text-violet-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Контейнер для табов с min-height и плавным переходом */}
            <div
              className="transition-all duration-300 min-h-[220px] flex-1"
              style={{ position: 'relative' }}
            >
              {activeTab === "Описание" && (
                <div className="text-gray-700 text-2xl">{product.descriptionFull}</div>
              )}
              {activeTab === "Состав" && (
                <div>
                  <div className="text-gray-700 font-bold mb-4 text-2xl">Активные ингредиенты</div>
                  <ul className="list-disc pl-8 space-y-2">
                    {product.ingredients.map((ing, idx) => (
                      <li key={idx}>
                        <a
                          href={ing.link}
                          className="text-violet-600 hover:underline text-2xl"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {ing.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === "Характеристики" && (
                <div className="space-y-4">
                  {product.characteristics.map((char, idx) => (
                    <div key={idx} className="flex gap-4 text-gray-700 text-2xl">
                      <span className="font-bold w-60">{char.label}:</span>
                      <span>{char.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
