const SKINCARE_PRODUCTS_STORAGE_KEY = 'mock_skincare_products';

const getMockSkincareProducts = () => {
  const storedProducts = localStorage.getItem(SKINCARE_PRODUCTS_STORAGE_KEY);
  return storedProducts ? JSON.parse(storedProducts) : [];
};

const saveMockSkincareProducts = (products) => {
  localStorage.setItem(SKINCARE_PRODUCTS_STORAGE_KEY, JSON.stringify(products));
};

const simulateNetworkDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchSkincareProducts = async () => {
  await simulateNetworkDelay();
  return getMockSkincareProducts();
};

export const createSkincareProduct = async (newProduct) => {
  await simulateNetworkDelay();
  const products = getMockSkincareProducts();
  const productToSave = { ...newProduct, id: Date.now().toString() };
  products.push(productToSave);
  saveMockSkincareProducts(products);
  return productToSave;
};

export const updateSkincareProduct = async (updatedProduct) => {
  await simulateNetworkDelay();
  let products = getMockSkincareProducts();
  products = products.map(product => 
    product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
  );
  saveMockSkincareProducts(products);
  return updatedProduct;
};

export const deleteSkincareProduct = async (id) => {
  await simulateNetworkDelay();
  let products = getMockSkincareProducts();
  products = products.filter(product => product.id !== id);
  saveMockSkincareProducts(products);
  return { id };
}; 