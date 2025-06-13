const MOCK_INGREDIENTS = [
  { id: 1, name: 'Гиалуроновая кислота', effect: 'Увлажнение и удержание влаги в коже, создает защитный барьер' },
  { id: 2, name: 'Ретинол', effect: 'Стимулирует обновление клеток, уменьшает морщины и пигментацию, улучшает текстуру кожи' },
  { id: 3, name: 'Ниацинамид', effect: 'Сужает поры, контролирует выработку себума, уменьшает воспаления и покраснения' },
  { id: 4, name: 'Витамин С', effect: 'Антиоксидант, осветляет кожу, стимулирует выработку коллагена' },
  { id: 5, name: 'Салициловая кислота', effect: 'Отшелушивает, очищает поры, борется с акне' },
  { id: 6, name: 'Пантенол', effect: 'Успокаивает, увлажняет, способствует заживлению' },
];

export const fetchIngredients = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowercasedQuery = query ? query.toLowerCase() : '';
      const filteredIngredients = MOCK_INGREDIENTS.filter(ingredient =>
        ingredient.name.toLowerCase().includes(lowercasedQuery)
      );
      resolve(filteredIngredients);
    }, 500); // Имитация сетевой задержки
  });
};

export const createIngredient = async (ingredient) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newIngredient = { id: Date.now(), ...ingredient };
      MOCK_INGREDIENTS.push(newIngredient);
      resolve(newIngredient);
    }, 500);
  });
};

export const updateIngredient = async (ingredient) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_INGREDIENTS.findIndex(ing => ing.id === ingredient.id);
      if (index !== -1) {
        MOCK_INGREDIENTS[index] = { ...MOCK_INGREDIENTS[index], ...ingredient };
        resolve(MOCK_INGREDIENTS[index]);
      } else {
        reject(new Error('Ingredient not found'));
      }
    }, 500);
  });
};

export const deleteIngredient = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = MOCK_INGREDIENTS.length;
      const newIngredients = MOCK_INGREDIENTS.filter(ing => ing.id !== id);
      if (newIngredients.length < initialLength) {
        // Обновить MOCK_INGREDIENTS, если ингредиент был удален
        MOCK_INGREDIENTS.splice(0, MOCK_INGREDIENTS.length, ...newIngredients);
        resolve({ success: true });
      } else {
        reject(new Error('Ingredient not found'));
      }
    }, 500);
  });
}; 