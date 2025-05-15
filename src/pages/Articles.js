import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Моковые данные статей
const mockArticles = [
  {
    id: 1,
    title: "Как правильно очищать комбинированную кожу",
    description: "Пошаговое руководство по ежедневной рутине для лица.",
    date: "12 мая",
    tags: ["Очищение", "Комбинированная кожа"],
    img: "https://via.placeholder.com/600x400?text=600+x+400",
  },
  {
    id: 2,
    title: "Всё что нужно знать о солнцезащите",
    description: "Разбираем SPF, PA+ и другие важные показатели.",
    date: "15 мая",
    tags: ["Загар", "SPF"],
    img: "https://via.placeholder.com/600x400?text=600+x+400",
  },
  {
    id: 3,
    title: "Ретинол: с чего начать",
    description: "Гайд по антивозрастному уходу и миру косметологии.",
    date: "19 мая",
    tags: ["Анти-эйдж", "Ретинол"],
    img: "https://via.placeholder.com/600x400?text=600+x+400",
  },
  {
    id: 4,
    title: "Составляем правильный уход",
    description: "Базовые принципы грамотного ухода за кожей.",
    date: "20 мая",
    tags: ["Комбинированная кожа", "Уход"],
    img: "https://via.placeholder.com/600x400?text=600+x+400",
  },
  {
    id: 5,
    title: "Топ-5 ошибок в уходе за кожей",
    description: "Чего стоит избегать, чтобы сохранить здоровье кожи.",
    date: "22 мая",
    tags: ["Ошибки", "Уход"],
    img: "https://via.placeholder.com/600x400?text=600+x+400",
  },
  {
    id: 6,
    title: "Гиалуроновая кислота: мифы и правда",
    description: "Разбираем популярные заблуждения и реальные свойства.",
    date: "25 мая",
    tags: ["Гиалуроновая кислота", "Увлажнение"],
    img: "https://via.placeholder.com/600x400?text=600+x+400",
  },
  // ... можно добавить больше статей для теста скролла
];

const allTags = Array.from(
  new Set(mockArticles.flatMap((a) => a.tags))
);

const PAGE_SIZE = 3;

export default function Articles() {
  const [articles, setArticles] = useState(mockArticles.slice(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const loaderRef = useRef(null);
  const dropdownRef = useRef(null);

  // Фильтрация статей по тегам
  const filteredArticles = selectedTags.length
    ? mockArticles.filter((a) => selectedTags.every((tag) => a.tags.includes(tag)))
    : mockArticles;

  useEffect(() => {
    setArticles(filteredArticles.slice(0, PAGE_SIZE));
    setPage(1);
  }, [selectedTags]);

  useEffect(() => {
    if (articles.length >= filteredArticles.length) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setArticles((prev) => {
              const next = filteredArticles.slice(0, (page + 1) * PAGE_SIZE);
              return next;
            });
            setPage((prev) => prev + 1);
            setLoading(false);
          }, 700);
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
  }, [loading, articles.length, page, filteredArticles]);

  // Теги для фильтра
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Закрытие dropdown при клике вне
  useEffect(() => {
    if (!showDropdown) return;
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown]);

  return (
    <div className="min-h-screen bg-[#F8F6FF] py-8 px-4">
      <div className="w-full max-w-[1400px] mx-auto flex gap-8">
        {/* Основная лента статей */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 relative">
            <h1 className="text-2xl font-bold">Полезные статьи</h1>
            <div className="relative">
              <button
                className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg font-semibold hover:bg-violet-200 transition"
                onClick={() => setShowDropdown((v) => !v)}
              >
                Выбрать теги
              </button>
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-20 p-3 flex flex-col gap-2"
                >
                  {allTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 cursor-pointer text-violet-700 hover:text-violet-900 text-base"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="accent-violet-500 w-4 h-4"
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
                  {allTags.length === 0 && <span className="text-gray-400">Нет тегов</span>}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4"
              >
                <img
                  src={article.img}
                  alt={article.title}
                  className="rounded-xl object-cover w-full h-[240px] bg-gray-200"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold mb-1">{article.title}</h2>
                    <span className="text-gray-400 text-sm whitespace-nowrap">{article.date}</span>
                  </div>
                  <div className="text-gray-600 text-base mb-2">{article.description}</div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div ref={loaderRef} className="w-full flex justify-center py-4">
              {loading && <span className="text-violet-500">Загрузка...</span>}
            </div>
          </div>
        </div>
        {/* Боковой блок */}
        <div className="w-[320px] flex-shrink-0">
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h3 className="text-lg font-bold mb-2">Рекомендуемые статьи</h3>
            <div className="text-gray-500 text-base mb-2">
              Чтобы получить персонально подобранные статьи вам нужно{' '}
              <Link to="/login" className="text-violet-600 hover:underline font-semibold">войти в аккаунт</Link>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
