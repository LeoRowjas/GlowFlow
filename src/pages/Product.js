import React from "react";

export default function Product() {
  return (
    <div className="min-h-screen bg-[#F8F6FF] py-12 px-6">
      <div className="w-full max-w-[1800px] min-h-[80vh] mx-auto bg-white rounded-2xl shadow-lg flex p-24 gap-24">
        <div className="w-[800px] flex-shrink-0 flex items-center justify-center">
          <div className="rounded-xl object-cover w-[760px] h-[760px] bg-gray-200 flex items-center justify-center text-gray-400 text-3xl">
            500 × 500
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center text-[1.35rem]">
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <h1 className="text-4xl font-bold mr-4">Название продукта</h1>
            </div>
            <div className="text-gray-600 text-2xl">Описание продукта</div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex gap-8 mb-8 border-b border-gray-200">
              <button className="px-4 pb-3 text-2xl font-semibold transition border-b-4 border-violet-500 text-violet-600">Описание</button>
              <button className="px-4 pb-3 text-2xl font-semibold transition border-b-4 border-transparent text-gray-500">Состав</button>
              <button className="px-4 pb-3 text-2xl font-semibold transition border-b-4 border-transparent text-gray-500">Характеристики</button>
            </div>
            <div className="transition-all duration-300 min-h-[220px] flex-1 text-gray-400 flex items-center">Нет данных</div>
          </div>
        </div>
      </div>
    </div>
  );
}
