import React, { useState } from "react";

export default function Product() {
  const [tab, setTab] = useState("Состав");
  return (
    <div className="min-h-screen bg-[#F8F6FF] py-12 px-6">
      <div className="w-full max-w-6xl min-h-[60vh] mx-auto bg-white rounded-2xl shadow-lg flex p-12 gap-12">
        <div className="w-[400px] flex-shrink-0 flex items-center justify-center">
          <div className="rounded-xl object-cover w-[380px] h-[380px] bg-gray-200 flex items-center justify-center text-gray-400 text-5xl">
            500 × 500
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center text-[1.35rem]">
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <h1 className="text-3xl font-bold mr-4">Увлажняющий крем La Roche-Posay <span className="align-middle text-2xl text-gray-400 ml-2 cursor-pointer">♡</span></h1>
            </div>
            <div className="text-gray-600 text-xl">Лёгкий крем с гиалуроновой кислотой</div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex gap-4 mb-3">
              <button
                className={`py-2 px-6 text-lg transition rounded-xl font-semibold ${tab === 'Описание' ? 'bg-violet-50 text-violet-700' : 'bg-transparent text-gray-500'}`}
                onClick={() => setTab('Описание')}
              >Описание</button>
              <button
                className={`py-2 px-6 text-lg transition rounded-xl font-semibold ${tab === 'Состав' ? 'bg-violet-50 text-violet-700' : 'bg-transparent text-gray-500'}`}
                onClick={() => setTab('Состав')}
              >Состав</button>
              <button
                className={`py-2 px-6 text-lg transition rounded-xl font-semibold ${tab === 'Характеристики' ? 'bg-violet-50 text-violet-700' : 'bg-transparent text-gray-500'}`}
                onClick={() => setTab('Характеристики')}
              >Характеристики</button>
            </div>
            {/* Контейнер для контента таба с фиксированной высотой и выравниванием */}
            <div className="relative min-h-[220px] w-full flex flex-col items-start justify-start text-left">
              {tab === 'Описание' && (
                <div className="transition-all duration-300 text-gray-700 text-lg mt-2">
                  Увлажняющий крем La Roche-Posay — лёгкий крем с гиалуроновой кислотой для ежедневного ухода. Быстро впитывается, не оставляет липкости, подходит для чувствительной кожи.
                </div>
              )}
              {tab === 'Состав' && (
                <div className="transition-all duration-300 text-gray-700 flex flex-col justify-start text-lg mt-2">
                  <div className="mb-2 font-semibold">Активные ингредиенты:</div>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-blue-700 underline hover:text-blue-900">Гиалуроновая кислота</a></li>
                    <li><a href="#" className="text-blue-700 underline hover:text-blue-900">Термальная вода La Roche-Posay</a></li>
                    <li><a href="#" className="text-blue-700 underline hover:text-blue-900">Глицерин</a></li>
                    <li><a href="#" className="text-blue-700 underline hover:text-blue-900">Масло ши</a></li>
                    <li><a href="#" className="text-blue-700 underline hover:text-blue-900">Ниацинамид</a></li>
                    <li><a href="#" className="text-blue-700 underline hover:text-blue-900">Церамиды</a></li>
                  </ul>
                </div>
              )}
              {tab === 'Характеристики' && (
                <div className="transition-all duration-300 text-gray-700 flex flex-col justify-start text-lg mt-2">
                  <div className="mb-2 font-semibold">Объём: <span className="font-normal">50 мл</span></div>
                  <div className="mb-2 font-semibold">Тип кожи: <span className="font-normal">Чувствительная, нормальная, комбинированная</span></div>
                  <div className="mb-2 font-semibold">Страна производства: <span className="font-normal">Франция</span></div>
                  <div className="mb-2 font-semibold">Без отдушек, парабенов и спирта</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
