import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    question: "Как ваша кожа чувствует себя утром после умывания?",
    options: [
      { text: "Стянутая, сухая.", type: "A" },
      { text: "Чистая, без особых ощущений.", type: "B" },
      { text: "Через пару часов появляется жирный блеск.", type: "C" },
      { text: "В некоторых местах сухая, в других — жирная.", type: "D" },
    ],
  },
  {
    question: "Как ваша кожа реагирует на смену погоды?",
    options: [
      { text: "Часто шелушится в холодную погоду.", type: "A" },
      { text: "Практически не меняется.", type: "B" },
      { text: "Быстро становится жирной в жару.", type: "C" },
      { text: "Зимой сухая, летом жирная.", type: "D" },
    ],
  },
  {
    question: "Как выглядят поры на вашем лице?",
    options: [
      { text: "Почти незаметные, суженные.", type: "A" },
      { text: "Обычные, средних размеров.", type: "B" },
      { text: "Расширенные, особенно в Т-зоне.", type: "C" },
      { text: "Разные: на лбу и носу расширенные, на щеках узкие.", type: "D" },
    ],
  },
  {
    question: "Вы пользуетесь увлажняющим кремом. Что происходит через 2-3 часа?",
    options: [
      { text: "Кожа снова становится сухой.", type: "A" },
      { text: "Всё в порядке, дискомфорта нет.", type: "B" },
      { text: "Появляется жирный блеск.", type: "C" },
      { text: "Щёки комфортны, но лоб и нос начинают блестеть.", type: "D" },
    ],
  },
  {
    question: "После умывания без крема кожа…",
    options: [
      { text: "Сухая и стянутая.", type: "A" },
      { text: "Обычная, без особых изменений.", type: "B" },
      { text: "Быстро становится жирной.", type: "C" },
      { text: "В одних зонах сухая, в других жирная.", type: "D" },
    ],
  },
  {
    question: "Как часто у вас появляются воспаления и прыщи?",
    options: [
      { text: "Почти никогда.", type: "A" },
      { text: "Иногда, перед менструацией или из-за стресса.", type: "B" },
      { text: "Часто, особенно на лбу, носу и подбородке.", type: "C" },
      { text: "Локально, в Т-зоне.", type: "D" },
    ],
  },
  {
    question: "Как ваша кожа выглядит к середине дня?",
    options: [
      { text: "Шелушится, местами сухая.", type: "A" },
      { text: "Не меняется.", type: "B" },
      { text: "Блестит, особенно в Т-зоне.", type: "C" },
      { text: "Жирный блеск на лбу, но сухие щеки.", type: "D" },
    ],
  },
  {
    question: "Как ваша кожа реагирует на декоративную косметику?",
    options: [
      { text: "Часто сушит, вызывает раздражение.", type: "A" },
      { text: "Держится хорошо, без особых проблем.", type: "B" },
      { text: "Через несколько часов появляется жирный блеск.", type: "C" },
      { text: "В некоторых местах косметика скатывается, в других остаётся нормально.", type: "D" },
    ],
  },
  {
    question: "Вы часто ощущаете зуд, раздражение или шелушение кожи?",
    options: [
      { text: "Да, часто.", type: "A" },
      { text: "Редко.", type: "B" },
      { text: "Почти никогда.", type: "C" },
      { text: "Иногда, но не по всему лицу.", type: "D" },
    ],
  },
  {
    question: "Как ваша кожа реагирует на новые косметические средства?",
    options: [
      { text: "Часто вызывает раздражение.", type: "A" },
      { text: "Реакция бывает, но редко.", type: "B" },
      { text: "Кожа становится жирной, поры засоряются.", type: "C" },
      { text: "В одних местах раздражение, в других — жирность.", type: "D" },
    ],
  },
  {
    question: "Как ваша кожа выглядит на фотографиях без фильтров?",
    options: [
      { text: "Тусклая, местами шелушится.", type: "A" },
      { text: "Обычная, без выраженных проблем.", type: "B" },
      { text: "Блестящая, особенно лоб, нос и подбородок.", type: "C" },
      { text: "Разная: лоб блестит, щеки матовые или сухие.", type: "D" },
    ],
  },
  {
    question: "Какие проблемы чаще всего вас беспокоят?",
    options: [
      { text: "Шелушение, стянутость.", type: "A" },
      { text: "Почти никаких.", type: "B" },
      { text: "Жирный блеск, прыщи.", type: "C" },
      { text: "Черные точки и жирность в Т-зоне, сухость на щеках.", type: "D" },
    ],
  },
  {
    question: "Насколько комфортно вы себя чувствуете без крема?",
    options: [
      { text: "Не могу, кожа стягивается.", type: "A" },
      { text: "Чувствую себя нормально.", type: "B" },
      { text: "Через несколько часов кожа становится жирной.", type: "C" },
      { text: "В одних местах комфортно, в других сухо.", type: "D" },
    ],
  },
  {
    question: "Какой тип кожи у ваших родителей?",
    options: [
      { text: "Сухая.", type: "A" },
      { text: "Нормальная.", type: "B" },
      { text: "Жирная.", type: "C" },
      { text: "Комбинированная.", type: "D" },
    ],
  },
  {
    question: "Как быстро ваша кожа загорает?",
    options: [
      { text: "Легко обгорает.", type: "A" },
      { text: "Загар ложится ровно.", type: "B" },
      { text: "Плохо загорает, часто появляются высыпания.", type: "C" },
      { text: "Лицо обгорает неравномерно.", type: "D" },
    ],
  },
  {
    question: "Насколько часто вам нужно умываться, чтобы чувствовать свежесть?",
    options: [
      { text: "Один раз в день достаточно.", type: "A" },
      { text: "Дважды в день комфортно.", type: "B" },
      { text: "Часто хочется умыться, кожа быстро жирнеет.", type: "C" },
      { text: "В Т-зоне часто, щеки комфортны весь день.", type: "D" },
    ],
  },
  {
    question: "Как кожа ведёт себя в самолёте или в сухом климате?",
    options: [
      { text: "Быстро сохнет, появляются шелушения.", type: "A" },
      { text: "Чувствует себя нормально.", type: "B" },
      { text: "Начинает жирнеть.", type: "C" },
      { text: "В одних местах сохнет, в других жирнеет.", type: "D" },
    ],
  },
  {
    question: "Как часто у вас появляются черные точки?",
    options: [
      { text: "Почти никогда.", type: "A" },
      { text: "Редко.", type: "B" },
      { text: "Часто.", type: "C" },
      { text: "В основном в Т-зоне.", type: "D" },
    ],
  },
  {
    question: "Какой у вас тип питания?",
    options: [
      { text: "Диета с минимальным количеством жиров.", type: "A" },
      { text: "Сбалансированное питание.", type: "B" },
      { text: "Много жирной, сладкой пищи.", type: "C" },
      { text: "Разное, без особых предпочтений.", type: "D" },
    ],
  },
  {
    question: "Как часто вы пользуетесь матирующими салфетками?",
    options: [
      { text: "Никогда.", type: "A" },
      { text: "Иногда.", type: "B" },
      { text: "Каждый день.", type: "C" },
      { text: "Только в Т-зоне.", type: "D" },
    ],
  },
];

const SKIN_TYPE_RESULTS = {
  A: {
    type: "Сухая кожа",
    features: ["Стянутость", "Шелушение", "Тонкая структура"],
    care: ["Интенсивное увлажнение", "Мягкое очищение", "Масла"],
    recommendedProducts: ["Увлажняющий крем La Roche-Posay", "Тоник Pyunkang Yul Essence Toner", "Крем Bioderma Sensibio AR"], // Статические рекомендации
  },
  B: {
    type: "Нормальная кожа",
    features: ["Ровный тон", "Редкие проблемы"],
    care: ["Поддержание баланса", "Лёгкие увлажняющие средства"],
    recommendedProducts: ["Очищающий гель CeraVe", "Увлажняющий крем La Roche-Posay", "Солнцезащитный крем Beauty of Joseon"],
  },
  C: {
    type: "Жирная кожа",
    features: ["Жирный блеск", "Расширенные поры", "Склонность к акне"],
    care: ["Матирующие средства", "Салициловая кислота", "Легкие текстуры"],
    recommendedProducts: ["Очищающий гель CeraVe", "Сыворотка The Ordinary Niacinamide 10% + Zinc 1%", "Маска COSRX"],
  },
  D: {
    type: "Комбинированная кожа",
    features: ["Жирная Т-зона", "Сухие щеки"],
    care: ["Баланс между увлажнением и контролем себума"],
    recommendedProducts: ["Очищающий гель CeraVe", "Увлажняющий крем La Roche-Posay", "Гель Holika Holika Aloe 99% Soothing Gel"],
  },
};

const calculateSkinType = (answers) => {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(answerType => {
    if (counts[answerType] !== undefined) {
      counts[answerType]++;
    }
  });

  let maxCount = 0;
  let dominantType = 'B'; // Default to Normal if no clear dominant type

  for (const type in counts) {
    if (counts[type] > maxCount) {
      maxCount = counts[type];
      dominantType = type;
    } else if (counts[type] === maxCount && type === 'D' && dominantType !== 'D') {
      // Tie-breaking: prioritize D (Combined) if tied with others and D is an option.
      // This is a simple tie-breaker, could be more complex if needed.
      dominantType = type;
    }
  }
  return SKIN_TYPE_RESULTS[dominantType];
};

function Test() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

    const handleLoginStatusChange = () => {
      const newStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(newStatus);
      if (!newStatus) {
        setTestStarted(false);
        setCurrentQuestionIndex(0);
        setUserAnswers(Array(QUESTIONS.length).fill(null));
        setShowResults(false);
        setTestResult(null);
        localStorage.removeItem('testPassed');
        localStorage.removeItem('skinTypeData');
      }
    };

    window.addEventListener('loginStatusChanged', handleLoginStatusChange);

    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
    };
  }, []);

  const handleStartTest = () => {
    setTestStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(QUESTIONS.length).fill(null));
    setShowResults(false);
    setTestResult(null);
    localStorage.setItem('testPassed', 'false'); // Сбрасываем testPassed при старте нового теста
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleAnswerSelect = (optionType) => {
    setUserAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = optionType;
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleSubmitTest = () => {
    const result = calculateSkinType(userAnswers.filter(answer => answer !== null));
    setTestResult(result);
    setShowResults(true);
    console.log('Результаты теста:', result);

    // Обновляем данные пользователя в localStorage
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
      let allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const updatedUsers = allUsers.map(user => {
        if (user.email === currentUserEmail) {
          return { ...user, testPassed: true, skinTypeData: result };
        }
        return user;
      });
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      window.dispatchEvent(new Event('loginStatusChanged')); // Уведомляем Header и Profile об изменениях
      console.log('Данные теста сохранены в аккаунте пользователя.');
    } else {
      console.warn('currentUserEmail не найден. Данные теста не сохранены.');
    }
  };

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const selectedAnswerForCurrentQuestion = userAnswers[currentQuestionIndex];
  const isNextButtonDisabled = selectedAnswerForCurrentQuestion === null;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center w-full max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Добро пожаловать в тест по определению типа кожи</h2>
          <p className="text-gray-600 mb-8 text-xl">
            Для прохождения теста необходимо войти в аккаунт. Это позволит вам сохранить ваши результаты и предоставить персональные рекомендации.
          </p>
          <button
            onClick={handleGoToLogin}
            className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center w-full max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Добро пожаловать в тест по определению типа кожи</h2>
          <p className="text-gray-600 mb-4 text-xl">
            Мы поможем вам узнать ваш тип кожи и подберем персональные рекомендации по уходу. Тест займет всего 2-3 минуты.
          </p>
          <p className="text-gray-600 mb-8 text-xl">
            В тесте {QUESTIONS.length} простых вопросов о вашей коже.<br/>Отвечайте максимально честно для получения точного результата.
          </p>
          <button
            onClick={handleStartTest}
            className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
          >
            Начать тест
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center w-full max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Результаты анализа типа кожи</h2>
          <p className="text-gray-600 mb-8 text-xl">
            На основе ваших ответов мы определили тип вашей кожи. В вашем профиле вас ждут персонально подобранные средства и детальные рекомендации по уходу.
          </p>
          {testResult && (
            <div className="text-left mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-700">{testResult.type}</h3>
              <div className="mb-4">
                <span className="font-semibold text-gray-700 text-xl">Основные потребности вашей кожи: </span>
                <ul className="list-disc list-inside mt-2 text-gray-600 text-xl">
                  {testResult.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-semibold text-gray-700 text-xl">Рекомендуемые средства: </span>
                <ul className="list-disc list-inside mt-2 text-gray-600 text-xl">
                  {testResult.recommendedProducts.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <button
            onClick={handleGoToProfile}
            className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
          >
            Перейти в профиль
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Определение типа кожи</h2>
        <p className="text-gray-600 mb-8 text-xl text-center">
          Ответьте на несколько вопросов, чтобы узнать тип вашей кожи и получить персональные рекомендации по уходу
        </p>

        <div className="w-full mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 text-xl">Вопрос {currentQuestionIndex + 1} из {QUESTIONS.length}</span>
            <div className="w-60 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-violet-500 h-2.5 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">{currentQuestion.question}</h3>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left py-4 px-6 rounded-lg text-xl transition ${
                  selectedAnswerForCurrentQuestion === option.type
                    ? "bg-violet-100 text-violet-700 border border-violet-500"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
                onClick={() => handleAnswerSelect(option.type)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between w-full mt-8">
          <button
            onClick={handleGoToHome}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg text-xl transition"
          >
            Выход
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={isNextButtonDisabled}
            className={`font-bold py-3 px-6 rounded-lg text-xl transition ${
              isNextButtonDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-violet-500 hover:bg-violet-600 text-white"
            }`}
          >
            {currentQuestionIndex === QUESTIONS.length - 1 ? "Завершить тест" : "Далее"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test;
  