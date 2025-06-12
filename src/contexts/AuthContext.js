import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Ключ для хранения пользователей в localStorage
const USERS_KEY = 'users';
const ADMIN_AUTH_KEY = 'adminAuth'; // Новый ключ для хранения статуса администратора

function getUsersFromStorage() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsersToStorage(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // Новое состояние для аутентификации администратора

  useEffect(() => {
    // Проверяем наличие токена и пользователя в localStorage при загрузке
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    // Проверяем статус администратора в localStorage
    const adminAuth = localStorage.getItem(ADMIN_AUTH_KEY);
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Авторизация по email и паролю
  const login = async (email, password) => {
    const users = getUsersFromStorage();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Неверный email или пароль');
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify(found));
    setUser(found);
    return found;
  };

  // Регистрация нового пользователя
  const register = async (username, name, email, password, age) => {
    const users = getUsersFromStorage();
    if (users.some(u => u.email === email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    const newUser = {
      id: Date.now().toString(),
      username,
      name,
      email,
      password,
      age,
      skinType: '',
      skinAnalysis: { problems: [], care: [] },
      recommendations: [],
    };
    users.push(newUser);
    saveUsersToStorage(users);
    // Не авторизуем сразу, просто возвращаем для редиректа на логин
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Новая функция для входа администратора
  const adminLogin = async (password) => {
    // В реальном приложении: использовать API для проверки пароля и получать токен
    // Для демонстрации: просто сравнение с жестко заданным паролем
    const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123'; // Используйте переменные окружения!
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setIsAdminAuthenticated(true);
      return true;
    } else {
      throw new Error('Неверный пароль администратора');
    }
  };

  // Новая функция для выхода администратора
  const adminLogout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAdminAuthenticated(false);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    setUser,
    isAdminAuthenticated, // Добавляем статус администратора в контекст
    adminLogin,           // Добавляем функцию входа администратора
    adminLogout,          // Добавляем функцию выхода администратора
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
}; 