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
  // Можно добавить больше моковых карточек для проверки скролла
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="w-full max-w-[1800px] mx-auto bg-white rounded-2xl shadow-lg flex p-10 gap-10">
        {/* Левая колонка */}
        <div className="w-[360px] flex flex-col items-center">
          <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-2xl mb-6">
            200 × 200
          </div>
          <div className="text-xl font-bold mb-4">{mockUserData.name}</div>
          {/* Блок с данными пользователя */}
          <div
            className="w-full rounded-2xl px-6 py-6 mb-3"
            style={{ background: "#F8F6FF" }}
          >
            <div className="text-gray-700 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Возраст:</span>
                <span>{mockUserData.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Тип кожи:</span>
                <span>{mockUserData.skinType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Эл. почта:</span>
                <span>{mockUserData.email}</span>
              </div>
            </div>
          </div>
          <button className="w-full py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-semibold transition">
            Выйти
          </button>
        </div>
        {/* Правая часть */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Анализ состояния кожи */}
          <div
            className="rounded-2xl p-6 shadow mb-4"
            style={{ background: "#F8F6FF" }}
          >
            <h2 className="text-lg font-semibold mb-4">Анализ состояния кожи</h2>
            <div className="mb-2">
              <span className="font-medium">Основные проблемы: </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {mockSkinAnalysis.problems.map((problem) => (
                  <span
                    key={problem}
                    className="inline-block px-3 py-1 rounded-lg text-sm font-medium"
                    style={{ background: "#FFFFFF", color: "#7C3AED" }}
                  >
                    {problem}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium">Необходимый уход: </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {mockSkinAnalysis.care.map((care) => (
                  <span
                    key={care}
                    className="inline-block px-3 py-1 rounded-lg text-sm font-medium"
                    style={{ background: "#FFFFFF", color: "#7C3AED" }}
                  >
                    {care}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Персональные рекомендации */}
          <div className="flex flex-col h-[400px]">
            <h2 className="text-lg font-semibold mb-4">Персональные рекомендации</h2>
            <div className="overflow-y-auto pr-2" style={{ maxHeight: 320 }}>
              <div className="grid grid-cols-2 gap-4">
                {mockRecommendations.map((rec, idx) => (
                  <div key={idx} className="bg-gray-100 rounded-xl shadow p-4 flex flex-col">
                    <img
                      src={rec.img}
                      alt={rec.title}
                      className="rounded-lg mb-3 object-cover w-full h-40"
                    />
                    <div className="font-semibold mb-1">{rec.title}</div>
                    <div className="text-gray-600 text-sm">{rec.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
