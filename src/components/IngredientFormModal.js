import React, { useState, useEffect } from 'react';

const IngredientFormModal = ({ ingredientData, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [effect, setEffect] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (ingredientData) {
      setName(ingredientData.name);
      setEffect(ingredientData.effect || '');
      setImageUrl(ingredientData.imageUrl || '');
    } else {
      setName('');
      setEffect('');
      setImageUrl('');
    }
  }, [ingredientData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, effect, imageUrl };
    if (ingredientData) {
      onSubmit({ ...ingredientData, ...data });
    } else {
      onSubmit(data);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {ingredientData ? 'Редактировать ингредиент' : 'Добавить новый ингредиент'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <p className="text-gray-600 mb-6">Заполните поле для {ingredientData ? 'изменения' : 'добавления нового'} ингредиента</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="ingredientName" className="block text-gray-700 text-sm font-bold mb-2">Название <span className="text-red-500">*</span></label>
            <input type="text" id="ingredientName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50" placeholder="Введите название ингредиента" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredientEffect" className="block text-gray-700 text-sm font-bold mb-2">Эффект</label>
            <textarea id="ingredientEffect" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50" placeholder="Введите эффект ингредиента" value={effect} onChange={(e) => setEffect(e.target.value)} rows="3"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="ingredientImage" className="block text-gray-700 text-sm font-bold mb-2">Изображение (URL)</label>
            <input type="url" id="ingredientImage" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50" placeholder="Введите URL изображения" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
          
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-bold">Информация</p>
            <p className="text-sm">Все поля помеченные <span className="text-red-500">*</span> обязательны для заполнения.</p>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">Отмена</button>
            <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg">
              {ingredientData ? 'Сохранить изменения' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IngredientFormModal; 