import React, { useState, useEffect } from 'react';
import { fetchSkincareProducts, createSkincareProduct, updateSkincareProduct, deleteSkincareProduct } from '../../api/skincareProductsApi';
import SkincareProductFormModal from '../../components/SkincareProductFormModal'; // Будет создан далее

const SkincareProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 'p1',
      name: 'Увлажняющий крем с гиалуроновой кислотой',
      brand: 'HydraBloom',
      description: 'Интенсивно увлажняющий крем для ежедневного ухода',
      skinTypes: ['Сухая', 'Нормальная'],
      ingredients: [{ id: 'ing1', name: 'Гиалуроновая кислота' }, { id: 'ing8', name: 'Керамиды' }, { id: 'ing9', name: 'Витамин E' }],
      imageUrl: 'https://via.placeholder.com/60?text=Product1',
    },
    {
      id: 'p2',
      name: 'Антивозрастная сыворотка с ретинолом',
      brand: 'YouthRevive',
      description: 'Концентрированная сыворотка для борьбы с признаками старения',
      skinTypes: ['Нормальная', 'Зрелая'],
      ingredients: [{ id: 'ing2', name: 'Ретинол' }, { id: 'ing7', name: 'Пептиды' }, { id: 'ing3', name: 'Витамин C' }],
      imageUrl: 'https://via.placeholder.com/60?text=Product2',
    },
    {
      id: 'p3',
      name: 'Очищающий гель для проблемной кожи',
      brand: 'ClearSkin',
      description: 'Мягкий очищающий гель с противовоспалительным действием',
      skinTypes: ['Жирная', 'Проблемная'],
      ingredients: [{ id: 'ing5', name: 'Салициловая кислота' }, { id: 'ing4', name: 'Ниацинамид' }, { id: 'ing6', name: 'Экстракт чайного дерева' }],
      imageUrl: 'https://via.placeholder.com/60?text=Product3',
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSkincareProducts();
        // Если localStorage пуст, инициализируем его заглушечными данными
        if (data.length === 0) {
          setProducts([
            {
              id: 'p1',
              name: 'Увлажняющий крем с гиалуроновой кислотой',
              brand: 'HydraBloom',
              description: 'Интенсивно увлажняющий крем для ежедневного ухода',
              skinTypes: ['Сухая', 'Нормальная'],
              ingredients: [{ id: 'ing1', name: 'Гиалуроновая кислота' }, { id: 'ing8', name: 'Керамиды' }, { id: 'ing9', name: 'Витамин E' }],
              imageUrl: 'https://via.placeholder.com/60?text=Product1',
            },
            {
              id: 'p2',
              name: 'Антивозрастная сыворотка с ретинолом',
              brand: 'YouthRevive',
              description: 'Концентрированная сыворотка для борьбы с признаками старения',
              skinTypes: ['Нормальная', 'Зрелая'],
              ingredients: [{ id: 'ing2', name: 'Ретинол' }, { id: 'ing7', name: 'Пептиды' }, { id: 'ing3', name: 'Витамин C' }],
              imageUrl: 'https://via.placeholder.com/60?text=Product2',
            },
            {
              id: 'p3',
              name: 'Очищающий гель для проблемной кожи',
              brand: 'ClearSkin',
              description: 'Мягкий очищающий гель с противовоспалительным действием',
              skinTypes: ['Жирная', 'Проблемная'],
              ingredients: [{ id: 'ing5', name: 'Салициловая кислота' }, { id: 'ing4', name: 'Ниацинамид' }, { id: 'ing6', name: 'Экстракт чайного дерева' }],
              imageUrl: 'https://via.placeholder.com/60?text=Product3',
            },
          ]);
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError('Не удалось загрузить уходовые средства.');
        console.error('Ошибка загрузки уходовых средств:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const createdProduct = await createSkincareProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
      closeModal();
    } catch (err) {
      setError('Не удалось добавить средство.');
      console.error('Ошибка добавления средства:', err);
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      const result = await updateSkincareProduct(updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === result.id ? result : product
        )
      );
      closeModal();
    } catch (err) {
      setError('Не удалось обновить средство.');
      console.error('Ошибка обновления средства:', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это средство?')) {
      try {
        await deleteSkincareProduct(id);
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      } catch (err) {
        setError('Не удалось удалить средство.');
        console.error('Ошибка удаления средства:', err);
      }
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Уходовые средства</h1>
        <button
          onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Добавить средство</span>
        </button>
      </div>

      {loading && <p className="text-gray-600">Загрузка уходовых средств...</p>}
      {error && <p className="text-red-500">Ошибка: {error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Название</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Описание</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Типы кожи</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ингредиенты</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Изображение</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500">
                    Уходовых средств пока нет.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.id}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold text-indigo-700">{product.name}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-900">{product.description}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-900">{product.skinTypes ? product.skinTypes.join(', ') : '-'}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-900">{product.ingredients ? product.ingredients.map(ing => ing.name).join(', ') : '-'}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {product.imageUrl && (
                        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
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
        <SkincareProductFormModal
          productData={selectedProduct}
          onClose={closeModal}
          onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
        />
      )}
    </div>
  );
};

export default SkincareProductsPage; 