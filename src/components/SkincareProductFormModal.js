import React, { useState, useEffect } from 'react';
import { fetchIngredients } from '../api/ingredientsApi'; // Импорт API ингредиентов

const SKINTYPES = [
  { value: 'Сухая', label: 'Сухая' },
  { value: 'Нормальная', label: 'Нормальная' },
  { value: 'Жирная', label: 'Жирная' },
  { value: 'Комбинированная', label: 'Комбинированная' },
  { value: 'Чувствительная', label: 'Чувствительная' },
  { value: 'Проблемная', label: 'Проблемная' },
  { value: 'Зрелая', label: 'Зрелая' },
];

const SkincareProductFormModal = ({ productData, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [skinTypes, setSkinTypes] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientSearchQuery, setIngredientSearchQuery] = useState('');
  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);

  useEffect(() => {
    if (productData) {
      setName(productData.name);
      setBrand(productData.brand || '');
      setImageUrl(productData.imageUrl || '');
      setDescription(productData.description);
      setSkinTypes(productData.skinTypes || []);
      setSelectedIngredients(productData.ingredients || []);
    } else {
      setName('');
      setBrand('');
      setImageUrl('');
      setDescription('');
      setSkinTypes([]);
      setSelectedIngredients([]);
    }
  }, [productData]);

  useEffect(() => {
    const loadSuggestions = async () => {
      if (ingredientSearchQuery.length > 1) { // Начинаем поиск после 2 символов
        try {
          const suggestions = await fetchIngredients(ingredientSearchQuery);
          // Фильтруем уже выбранные ингредиенты
          setIngredientSuggestions(suggestions.filter(sug => 
            !selectedIngredients.some(sel => sel.id === sug.id)
          ));
        } catch (error) {
          console.error('Ошибка загрузки ингредиентов:', error);
          setIngredientSuggestions([]);
        }
      } else {
        setIngredientSuggestions([]);
      }
    };
    loadSuggestions();
  }, [ingredientSearchQuery, selectedIngredients]);

  const handleSkinTypeChange = (e) => {
    const { value, checked } = e.target;
    setSkinTypes((prev) =>
      checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients((prev) => [...prev, ingredient]);
    setIngredientSearchQuery('');
    setIngredientSuggestions([]);
  };

  const handleRemoveIngredient = (id) => {
    setSelectedIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      brand,
      imageUrl,
      description,
      skinTypes,
      ingredients: selectedIngredients,
    };
    if (productData) {
      onSubmit({ ...productData, ...data });
    } else {
      onSubmit(data);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {productData ? 'Редактировать средство' : 'Добавить новое средство'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <p className="text-gray-600 mb-6">Заполните все поля для {productData ? 'изменения' : 'добавления нового'} средства</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Название <span className="text-red-500">*</span></label>
            <input type="text" id="productName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50" placeholder="Введите название средства" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="productBrand" className="block text-gray-700 text-sm font-bold mb-2">Бренд <span className="text-red-500">*</span></label>
            <input type="text" id="productBrand" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50" placeholder="Введите название бренда" value={brand} onChange={(e) => setBrand(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="productImage" className="block text-gray-700 text-sm font-bold mb-2">URL изображения</label>
            <input type="url" id="productImage" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50" placeholder="Введите URL изображения" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-gray-700 text-sm font-bold mb-2">Описание <span className="text-red-500">*</span></label>
            <textarea id="productDescription" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 bg-gray-50" placeholder="Введите описание" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Типы кожи <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-2 gap-2">
              {SKINTYPES.map((type) => (
                <label key={type.value} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600"
                    value={type.value}
                    checked={skinTypes.includes(type.value)}
                    onChange={handleSkinTypeChange}
                  />
                  <span className="ml-2 text-gray-700 text-sm">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="ingredientSearch" className="block text-gray-700 text-sm font-bold mb-2">Ингредиенты <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="text"
                id="ingredientSearch"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
                placeholder="Поиск ингредиентов..."
                value={ingredientSearchQuery}
                onChange={(e) => setIngredientSearchQuery(e.target.value)}
              />
              {ingredientSuggestions.length > 0 && ingredientSearchQuery.length > 1 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
                  {ingredientSuggestions.map((ing) => (
                    <li
                      key={ing.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleIngredientSelect(ing)}
                    >
                      {ing.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedIngredients.map((ing) => (
                <span key={ing.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {ing.name}
                  <button type="button" onClick={() => handleRemoveIngredient(ing.id)} className="ml-1 text-indigo-600 hover:text-indigo-900 focus:outline-none">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-bold">Информация</p>
            <p className="text-sm">Все поля помеченные <span className="text-red-500">*</span> обязательны для заполнения.</p>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">Отмена</button>
            <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg">
              {productData ? 'Сохранить изменения' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkincareProductFormModal; 