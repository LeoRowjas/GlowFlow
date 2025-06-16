import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products as mockRecommendations } from "../data/products";

const PAGE_SIZE = 4;

export default function Profile() {
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    age: "",
    email: "",
  });
  const [testPassed, setTestPassed] = useState(false);
  const [skinTypeAnalysisResult, setSkinTypeAnalysisResult] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Profile component mounted.');
    const loadUserData = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const currentUserEmail = localStorage.getItem('currentUserEmail');
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');

      if (isLoggedIn && currentUserEmail) {
        const currentUser = allUsers.find(user => user.email === currentUserEmail);
        if (currentUser) {
          setUserData(currentUser);
          setTestPassed(currentUser.testPassed);
          setSkinTypeAnalysisResult(currentUser.skinTypeData);
          console.log('Loaded user data from localStorage:', currentUser);
        } else {
          // Если пользователь не найден (например, был удален), очищаем сессию
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('currentUserEmail');
          setUserData({ username: "", name: "", age: "", email: "" });
          setTestPassed(false);
          setSkinTypeAnalysisResult(null);
          navigate('/login'); // Перенаправляем на страницу входа
        }
      } else {
        setUserData({ username: "", name: "", age: "", email: "" });
        setTestPassed(false);
        setSkinTypeAnalysisResult(null);
        navigate('/login'); // Если не авторизован, перенаправляем на страницу входа
      }
    };

    loadUserData(); // Initial load

    const handleLoginStatusChange = () => {
      console.log('Login status changed event detected in Profile.js');
      loadUserData(); // Re-load user data on login status change
    };

    window.addEventListener('loginStatusChanged', handleLoginStatusChange);

    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
    };
  }, [navigate]); // Добавляем navigate в зависимости, так как он используется в эффекте

  // Effect to initialize/reset recommendations based on testPassed status
  useEffect(() => {
    console.log('testPassed status changed:', testPassed);
    if (testPassed) {
      const storedPage = localStorage.getItem('profileRecommendationsPage');
      const initialPage = storedPage ? parseInt(storedPage, 10) : 1;
      setRecommendations(mockRecommendations.slice(0, initialPage * PAGE_SIZE));
      setPage(initialPage);
      console.log('Test passed, initial recommendations loaded (from state change):', mockRecommendations.slice(0, initialPage * PAGE_SIZE).length, 'page:', initialPage);
    } else {
      setRecommendations([]);
      setPage(1);
      localStorage.removeItem('profileRecommendationsPage');
      console.log('Test not passed, recommendations cleared (from state change).');
    }
  }, [testPassed]);

  // Effect for IntersectionObserver (бесконечная прокрутка)
  useEffect(() => {
    let observer;

    if (!testPassed) {
      console.log('IntersectionObserver not active: Test not passed.');
      if (loaderRef.current) {
        if (observer) {
          observer.unobserve(loaderRef.current);
        }
      }
      return;
    }

    if (recommendations.length >= mockRecommendations.length || !loaderRef.current) {
      console.log('All recommendations loaded or no loaderRef. Unobserving loader if observing.');
      if (observer && loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
      return;
    }

    console.log('Setting up IntersectionObserver. Current page:', page, 'Recommendations count:', recommendations.length);
    observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          console.log('Loader intersected! Loading more...');
          setLoading(true);
          setTimeout(() => {
            setRecommendations((prev) => {
              const startIndex = prev.length;
              const endIndex = startIndex + PAGE_SIZE;
              const newRecommendations = mockRecommendations.slice(startIndex, endIndex);
              console.log('Loaded new recommendations:', newRecommendations.length);
              return [...prev, ...newRecommendations];
            });
            setPage((prev) => {
              const nextPage = prev + 1;
              localStorage.setItem('profileRecommendationsPage', nextPage.toString());
              console.log('Next page:', nextPage);
              return nextPage;
            });
            setLoading(false);
          }, 700);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loaderRef.current);
    console.log('Observer observing loaderRef.');

    return () => {
      console.log('Observer cleanup.');
      if (observer && loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, page, testPassed, recommendations.length]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserEmail'); // Очищаем только текущий email
    localStorage.removeItem('profileRecommendationsPage'); // Очищаем только для текущей сессии
    window.dispatchEvent(new Event('loginStatusChanged'));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-0 px-0">
      <div className="w-full bg-white rounded-3xl shadow-lg flex p-9 gap-9 my-12">
        {/* Левая колонка */}
        <div className="basis-[24%] max-w-[24%] flex flex-col items-center">
          <div className="w-72 h-72 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-3xl mb-6">
            200 × 200
          </div>
          <div className="text-2xl font-bold mb-3">{userData.name || "Гость"}</div>
          <div
            className="w-full rounded-2xl px-9 py-9 mb-9"
            style={{ background: "#F8F6FF" }}
          >
            <div className="text-gray-700 space-y-6 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">Возраст:</span>
                <span className="font-semibold">{userData.age || "Не указан"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Тип кожи:</span>
                <span className="font-semibold">{testPassed && skinTypeAnalysisResult ? skinTypeAnalysisResult.type : "Не определен"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Эл. почта:</span>
                <span className="font-semibold">{userData.email || "Не указан"}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-bold text-lg transition">
            Выйти
          </button>
        </div>
        {/* Правая часть */}
        <div className="flex-1 min-w-0 flex flex-col gap-16 text-lg overflow-y-auto">
          {testPassed ? (
            <>
              {/* Анализ состояния кожи */}
              <div
                className="rounded-2xl border p-9 mb-12"
                style={{ background: "#F8F6FF" }}
              >
                <h2 className="text-2xl font-bold mb-6">Анализ состояния кожи</h2>
                <div className="mb-3">
                  <span className="font-semibold">Основные проблемы: </span>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {testPassed && skinTypeAnalysisResult && skinTypeAnalysisResult.features.map((problem) => (
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
                    {testPassed && skinTypeAnalysisResult && skinTypeAnalysisResult.care.map((care) => (
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
                  {recommendations.map((rec) => (
                    <Link
                      key={rec.id}
                      to={`/product/${rec.id}`}
                      className="bg-gray-100 rounded-xl shadow p-6 flex flex-col transition hover:shadow-lg hover:bg-gray-200 cursor-pointer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        src={rec.image}
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
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-2xl font-bold mb-4">Узнайте больше о себе!</h2>
              <p className="text-gray-600 mb-6">Пройдите наш тест, чтобы получить персональные рекомендации по уходу за кожей.</p>
              <Link to="/test" className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-6 rounded-lg transition">
                Пройти тест
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
