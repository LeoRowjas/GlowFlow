import React, { useState, useEffect } from 'react';

const ArticleFormModal = ({ articleData, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (articleData) {
      setTitle(articleData.title);
      setDescription(articleData.description);
      setLink(articleData.link);
      setPublishDate(articleData.publishDate);
      setImageUrl(articleData.imageUrl || '');
    } else {
      setTitle('');
      setDescription('');
      setLink('');
      setPublishDate('');
      setImageUrl('');
    }
  }, [articleData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      link,
      publishDate,
      imageUrl,
    };
    if (articleData) {
      onSubmit({ ...articleData, ...data });
    } else {
      onSubmit(data);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {articleData ? 'Редактировать статью' : 'Добавить новую статью'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <p className="text-gray-600 mb-6">Заполните все поля для {articleData ? 'изменения' : 'добавления новой'} статьи</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="articleTitle" className="block text-gray-700 text-sm font-bold mb-2">Название статьи <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="articleTitle"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="Введите название статьи"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="articleDescription" className="block text-gray-700 text-sm font-bold mb-2">Описание <span className="text-red-500">*</span></label>
            <textarea
              id="articleDescription"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 bg-gray-50"
              placeholder="Введите описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="articleURL" className="block text-gray-700 text-sm font-bold mb-2">URL статьи <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="articleURL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="https://example.com/article"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">URL изображения</label>
            <input
              type="text"
              id="imageUrl"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="publishDate" className="block text-gray-700 text-sm font-bold mb-2">Дата публикации <span className="text-red-500">*</span></label>
            <input
              type="date"
              id="publishDate"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              required
            />
          </div>
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-bold">Информация</p>
            <p className="text-sm">Все поля помеченные <span className="text-red-500">*</span> обязательны для заполнения. После сохранения статьи появятся пользователи в таблице.</p>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">Отмена</button>
            <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg">
              {articleData ? 'Сохранить изменения' : 'Создать статью'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleFormModal; 