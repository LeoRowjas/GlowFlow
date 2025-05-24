import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

// Вопросы и варианты (можно расширить/изменить)
const QUESTIONS = [
  {
    question: "Как ваша кожа выглядит через несколько часов после умывания?",
    options: [
      "Стянута и сухая",
      "Жирная в Т-зоне",
      "Жирная по всему лицу",
      "Нормальная, без особых изменений"
    ]
  },
  {
    question: "Как часто у вас появляются высыпания?",
    options: [
      "Почти никогда",
      "Иногда, в Т-зоне",
      "Часто, по всему лицу",
      "Редко, только перед менструацией или стрессом"
    ]
  },
  {
    question: "Как кожа реагирует на смену погоды?",
    options: [
      "Становится суше",
      "Становится жирнее в Т-зоне",
      "Становится жирной и блестящей",
      "Почти не меняется"
    ]
  },
  {
    question: "Есть ли у вас шелушения?",
    options: [
      "Часто",
      "Редко, только зимой",
      "Нет",
      "Иногда, после умывания"
    ]
  },
  {
    question: "Как быстро появляется блеск на лице?",
    options: [
      "Почти не появляется",
      "Через несколько часов в Т-зоне",
      "Через 1-2 часа на всём лице",
      "Только к вечеру"
    ]
  }
];

// Моковые рекомендации для профиля (были раньше, теперь расширены)
const MOCK_RECOMMENDATIONS = [
  {
    title: 'Очищающий гель CeraVe',
    description: 'Нежное очищение для комбинированной кожи',
    img: 'https://via.placeholder.com/366x160?text=366+x+160',
  },
  {
    title: 'Увлажняющий крем La Roche-Posay',
    description: 'Лёгкий крем с гиалуроновой кислотой',
    img: 'https://via.placeholder.com/366x160?text=366+x+160',
  },
  {
    title: 'Солнцезащитный крем Beauty of Joseon',
    description: 'SPF 50+ PA++++',
    img: 'https://via.placeholder.com/366x160?text=366+x+160',
  },
  {
    title: 'Ночная маска COSRX',
    description: 'Восстанавливающая маска с центеллой',
    img: 'https://via.placeholder.com/366x160?text=366+x+160',
  },
  {
    title: 'Тонер с BHA Paula\'s Choice',
    description: 'Мягкое отшелушивание и сужение пор',
    img: 'https://via.placeholder.com/366x160?text=366+x+160',
  },
  {
    title: 'Сыворотка The Ordinary',
    description: 'Ниацинамид 10% + Цинк 1%',
    img: 'https://via.placeholder.com/366x160?text=366+x+160',
  },
  {
    title: 'Крем Bioderma Sensibio',
    description: 'Успокаивающий крем для чувствительной кожи',
    img: 'https://via.placeholder.com/366x160?text=366+x+160',
  },
  {
    title: 'Гель Holika Holika Aloe',
    description: 'Универсальный гель с алоэ вера',
    img: 'https://via.placeholder.com/366x160?text=366+x+160',
  },
  {
    title: 'Тканевая маска Mediheal',
    description: 'Экспресс-уход и увлажнение',
    img: 'https://via.placeholder.com/366x160?text=366+x+160',
  },
  {
    title: 'Пенка для умывания Avene',
    description: 'Мягкое очищение для всех типов кожи',
    img: 'https://via.placeholder.com/366x160?text=366+x+160',
  },
];

// Статический список ухода (как на картинке)
const STATIC_CARE = [
  'Глубокое увлажнение',
  'Защита от солнца',
  'Мягкое отшелушивание',
];

// Простая логика для определения типа кожи и рекомендаций
function getResult(answers) {
  // Можно усложнить, сейчас простая логика по преобладающим ответам
  const counts = [0, 0, 0, 0];
  answers.forEach(idx => { if (idx !== null) counts[idx]++; });
  const maxIdx = counts.indexOf(Math.max(...counts));
  switch (maxIdx) {
    case 0:
      return {
        type: "Сухая кожа",
        needs: ["Интенсивное увлажнение", "Питание", "Защита от ветра и холода"],
        products: ["Питательное молочко", "Увлажняющий крем", "Масло для лица"],
        problems: ["Сухость", "Высыпания", "Шелушение"],
      };
    case 1:
      return {
        type: "Комбинированная кожа",
        needs: ["Увлажнение в Т-зоне", "Контроль жирности", "Защита от УФ-излучения"],
        products: ["Очищающий гель для умывания", "Лёгкий увлажняющий крем", "Матирующая сыворотка"],
        problems: ["Жирность", "Высыпания", "Шелушение"],
      };
    case 2:
      return {
        type: "Жирная кожа",
        needs: ["Глубокое очищение", "Контроль себума", "Лёгкое увлажнение"],
        products: ["Гель для умывания", "Матирующий крем", "Тоник с кислотами"],
        problems: ["Жирность", "Высыпания", "Шелушение"],
      };
    case 3:
    default:
      return {
        type: "Нормальная кожа",
        needs: ["Поддержание баланса", "Лёгкое увлажнение", "Защита от солнца"],
        products: ["Мягкий гель для умывания", "Увлажняющий крем", "SPF-крем"],
        problems: ["Сухость", "Высыпания", "Шелушение"],
      };
  }
}

export default function Test() {
  const { isAuthenticated, user, setUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 — приветствие, 1..N — вопросы, N+1 — результат
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [updated, setUpdated] = useState(false);

  // Сохраняем результат теста в профиль пользователя, когда step > QUESTIONS.length
  React.useEffect(() => {
    if (step > QUESTIONS.length && user && !updated) {
      const result = getResult(answers);
      const updatedUser = {
        ...user,
        skinType: result.type,
        skinAnalysis: {
          problems: result.problems,
          care: STATIC_CARE,
        },
        recommendations: MOCK_RECOMMENDATIONS,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const idx = users.findIndex(u => u.email === user.email);
      if (idx !== -1) {
        users[idx] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
      }
      setUser && setUser(updatedUser);
      setUpdated(true);
    }
    // eslint-disable-next-line
  }, [step, user, updated]);

  // Неавторизованный пользователь
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6FF]">
        <div className="bg-white rounded-2xl shadow-md px-24 py-24 max-w-3xl w-full flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-10 text-center">Добро пожаловать в тест по определению типа кожи</h2>
          <p className="text-gray-600 text-center mb-16 text-2xl">
            Для прохождения теста необходимо войти в аккаунт. Это позволит нам сохранить ваши результаты и предоставить персональные рекомендации.
          </p>
          <button
            className="px-16 py-6 rounded-xl bg-violet-700 text-white font-bold text-2xl hover:bg-violet-800 transition"
            onClick={() => navigate('/login')}
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  // Приветственный экран
  if (step === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6FF]">
        <div className="bg-white rounded-2xl shadow-md px-24 py-24 max-w-3xl w-full flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-10 text-center">Добро пожаловать в тест по определению типа кожи</h2>
          <div className="text-gray-600 text-center mb-16 text-2xl">
            Мы поможем вам узнать ваш тип кожи и подберём персональные рекомендации по уходу. Тест займёт всего 2–3 минуты.<br /><br />
            В тесте 5 простых вопросов о вашей коже<br />
            Отвечайте максимально честно для получения точного результата
          </div>
          <button
            className="px-16 py-6 rounded-xl bg-violet-700 text-white font-bold text-2xl hover:bg-violet-800 transition"
            onClick={() => { setStep(1); setSelected(null); setUpdated(false); }}
          >
            Начать тест
          </button>
        </div>
      </div>
    );
  }

  // Экран результата
  if (step > QUESTIONS.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6FF]">
        <div className="bg-white rounded-2xl shadow-md px-16 py-20 max-w-3xl w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-8 text-center">Результаты анализа типа кожи</h2>
          <div className="text-lg text-center text-gray-500 mb-10">
            На основе ваших ответов мы определили тип вашей кожи. В вашем профиле вас ждут персональные подборки средств и детальные рекомендации по уходу.
          </div>
          <div className="bg-[#F8F6FF] rounded-xl p-8 mb-10 w-full">
            <div className="font-semibold text-xl mb-4">{getResult(answers).type}</div>
            <div className="font-semibold text-gray-700 text-lg mb-4">Основные проблемы вашей кожи:</div>
            <ul className="list-disc pl-7 text-gray-700 text-lg mb-4">
              {getResult(answers).problems.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>
          <div className="w-full mb-10">
            <div className="text-gray-700 text-lg mb-4">Рекомендуемые средства:</div>
            <ul className="space-y-4">
              {getResult(answers).products.map((p, i) => (
                <li key={i} className="bg-[#F8F6FF] rounded-xl px-6 py-4 shadow-sm text-lg">{p}</li>
              ))}
            </ul>
          </div>
          <button
            className="px-14 py-5 rounded-xl bg-violet-700 text-white font-bold text-2xl hover:bg-violet-800 transition"
            onClick={() => navigate('/profile')}
          >
            Перейти в профиль
          </button>
        </div>
      </div>
    );
  }

  // Экран вопроса
  const q = QUESTIONS[step - 1];
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6FF]">
      <div className="bg-white rounded-2xl shadow-md px-16 py-20 max-w-3xl w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-center">Определение типа кожи</h2>
        <div className="text-gray-600 text-center mb-8 text-xl">
          Ответьте на несколько вопросов, чтобы узнать тип вашей кожи и получить персональные рекомендации по уходу
        </div>
        <div className="w-full flex justify-between items-center mb-4">
          <span className="text-lg text-gray-500">Вопрос {step} из {QUESTIONS.length}</span>
          <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-violet-400" style={{ width: `${(step) / QUESTIONS.length * 100}%` }} />
          </div>
        </div>
        <div className="font-semibold text-2xl mb-10 text-center">{q.question}</div>
        <div className="w-full flex flex-col gap-6 mb-12">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className={`w-full px-6 py-5 rounded-xl border text-left transition font-semibold text-xl ${selected === idx ? 'bg-violet-100 border-violet-500' : 'bg-gray-50 border-gray-200 hover:border-violet-400'}`}
              onClick={() => setSelected(idx)}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="w-full flex justify-between">
          <button
            className="px-10 py-4 rounded-xl border border-violet-700 text-violet-700 font-semibold text-xl hover:bg-violet-50 transition"
            onClick={() => { setStep(0); setAnswers(Array(QUESTIONS.length).fill(null)); setSelected(null); setUpdated(false); }}
          >
            Выход
          </button>
          <button
            className={`px-10 py-4 rounded-xl text-white font-semibold text-xl transition ${selected !== null ? 'bg-violet-700 hover:bg-violet-800' : 'bg-gray-200 cursor-not-allowed'}`}
            disabled={selected === null}
            onClick={() => {
              const newAnswers = [...answers];
              newAnswers[step - 1] = selected;
              setAnswers(newAnswers);
              setSelected(null);
              setStep(step + 1);
            }}
          >
            {step === QUESTIONS.length ? 'Завершить' : 'Далее'}
          </button>
        </div>
      </div>
    </div>
  );
}
  