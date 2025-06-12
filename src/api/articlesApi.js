const ARTICLES_STORAGE_KEY = 'mock_articles';

const getMockArticles = () => {
  const storedArticles = localStorage.getItem(ARTICLES_STORAGE_KEY);
  return storedArticles ? JSON.parse(storedArticles) : [];
};

const saveMockArticles = (articles) => {
  localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
};

// Имитация задержки сети
const simulateNetworkDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchArticles = async () => {
  await simulateNetworkDelay();
  return getMockArticles();
};

export const createArticle = async (newArticle) => {
  await simulateNetworkDelay();
  const articles = getMockArticles();
  const articleToSave = { ...newArticle, id: Date.now().toString() }; // Генерация простого ID
  articles.push(articleToSave);
  saveMockArticles(articles);
  return articleToSave;
};

export const updateArticle = async (updatedArticle) => {
  await simulateNetworkDelay();
  let articles = getMockArticles();
  articles = articles.map(article => 
    article.id === updatedArticle.id ? { ...article, ...updatedArticle } : article
  );
  saveMockArticles(articles);
  return updatedArticle;
};

export const deleteArticle = async (id) => {
  await simulateNetworkDelay();
  let articles = getMockArticles();
  articles = articles.filter(article => article.id !== id);
  saveMockArticles(articles);
  return { id };
}; 