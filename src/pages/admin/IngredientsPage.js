import React, { useState, useEffect } from 'react';
import { fetchIngredients, createIngredient, updateIngredient, deleteIngredient } from '../../api/ingredientsApi';
import IngredientFormModal from '../../components/IngredientFormModal'; // Будет создан далее

const IngredientsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchIngredients();
        setIngredients(data);
      } catch (err) {
        setError('Не удалось загрузить ингредиенты.');
        console.error('Ошибка загрузки ингредиентов:', err);
      } finally {
        setLoading(false);
      }
    };
    loadIngredients();
  }, []);

  const handleAddIngredient = async (newIngredient) => {
    try {
      const createdIngredient = await createIngredient(newIngredient);
      setIngredients((prevIngredients) => [...prevIngredients, createdIngredient]);
      closeModal();
    } catch (err) {
      setError('Не удалось добавить ингредиент.');
      console.error('Ошибка добавления ингредиента:', err);
    }
  };

  const handleEditIngredient = async (updatedIngredient) => {
    try {
      const result = await updateIngredient(updatedIngredient);
      setIngredients((prevIngredients) =>
        prevIngredients.map((ingredient) =>
          ingredient.id === result.id ? result : ingredient
        )
      );
      closeModal();
    } catch (err) {
      setError('Не удалось обновить ингредиент.');
      console.error('Ошибка обновления ингредиента:', err);
    }
  };

  const handleDeleteIngredient = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот ингредиент?')) {
      try {
        await deleteIngredient(id);
        setIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.id !== id));
      } catch (err) {
        setError('Не удалось удалить ингредиент.');
        console.error('Ошибка удаления ингредиента:', err);
      }
    }
  };

  const openEditModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIngredient(null);
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Ингредиенты</h1>
        <button
          onClick={() => { setSelectedIngredient(null); setIsModalOpen(true); }}
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Добавить ингредиент</span>
        </button>
      </div>

      {loading && <p className="text-gray-600">Загрузка ингредиентов...</p>}
      {error && <p className="text-red-500">Ошибка: {error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Название</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500">
                    Ингредиентов пока нет.
                  </td>
                </tr>
              ) : (
                ingredients.map((ingredient) => (
                  <tr key={ingredient.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ingredient.id}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold text-indigo-700">{ingredient.name}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => openEditModal(ingredient)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteIngredient(ingredient.id)}
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
        <IngredientFormModal
          ingredientData={selectedIngredient}
          onClose={closeModal}
          onSubmit={selectedIngredient ? handleEditIngredient : handleAddIngredient}
        />
      )}
    </div>
  );
};

export default IngredientsPage; 