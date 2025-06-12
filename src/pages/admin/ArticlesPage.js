import React, { useState, useEffect } from 'react';
import ArticleFormModal from '../../components/ArticleFormModal';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../api/articlesApi'; // Импорт заглушечных API

const ArticlesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]); // Изначально пустой массив
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null);   // Состояние ошибки

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchArticles();
        setArticles(data);
      } catch (err) {
        setError('Не удалось загрузить статьи.');
        console.error('Ошибка загрузки статей:', err);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  const handleAddArticle = async (newArticle) => {
    try {
      const createdArticle = await createArticle(newArticle);
      setArticles((prevArticles) => [...prevArticles, createdArticle]);
      closeModal();
    } catch (err) {
      setError('Не удалось добавить статью.');
      console.error('Ошибка добавления статьи:', err);
    }
  };

  const handleEditArticle = async (updatedArticle) => {
    try {
      const result = await updateArticle(updatedArticle);
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === result.id ? result : article
        )
      );
      closeModal();
    } catch (err) {
      setError('Не удалось обновить статью.');
      console.error('Ошибка обновления статьи:', err);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту статью?')) {
      try {
        await deleteArticle(id);
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
      } catch (err) {
        setError('Не удалось удалить статью.');
        console.error('Ошибка удаления статьи:', err);
      }
    }
  };

  const openEditModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Статьи</h1>
        <button
          onClick={() => { setSelectedArticle(null); setIsModalOpen(true); }}
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Добавить статью</span>
        </button>
      </div>

      {loading && <p className="text-gray-600">Загрузка статей...</p>}
      {error && <p className="text-red-500">Ошибка: {error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Изображение</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Название</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Описание</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ссылка</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Дата публикации</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500">
                    Статей пока нет.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{article.id}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {article.imageUrl && (
                        <img src={article.imageUrl} alt="Article" className="w-16 h-16 object-cover rounded-md" />
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold text-indigo-700">{article.title}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-900">{article.description}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {article.link}
                      </a>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-900">{article.publishDate}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => openEditModal(article)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <ArticleFormModal
          articleData={selectedArticle}
          onClose={closeModal}
          onSubmit={selectedArticle ? handleEditArticle : handleAddArticle}
        />
      )}
    </div>
  );
};

export default ArticlesPage; 