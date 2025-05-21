import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Моковые данные для профиля авторизованного пользователя
const mockProfile = {
  id: 'mock-user-id',
  name: 'Alexandra Smith',
  age: 28,
  email: 'example@gmail.com',
  skinType: 'Комбинированная',
  skinAnalysis: {
    problems: ['Обезвоженность', 'Расширенные поры', 'Неравномерный тон'],
    care: ['Глубокое увлажнение', 'Защита от солнца', 'Мягкое отшелушивание'],
  },
  recommendations: [
    {
      title: 'Очищающий гель CeraVe',
      description: 'Нежное очищение для комбинированной кожи',
      img: 'https://via.placeholder.com/366x160?text=366+x+160',
    },
    {
      title: 'Увлажняющий крем La Roche-Posay',
      description: 'Лёгкий крем с гиалуроновой кислотой',
      img: 'https://via.placeholder.com/366x160?text=366+x+160',
    },
    {
      title: 'Солнцезащитный крем Beauty of Joseon',
      description: 'SPF 50+ PA++++',
      img: 'https://via.placeholder.com/366x160?text=366+x+160',
    },
    {
      title: 'Ночная маска COSRX',
      description: 'Восстанавливающая маска с центеллой',
      img: 'https://via.placeholder.com/366x160?text=366+x+160',
    },
    {
      title: 'Тонер с BHA Paula\'s Choice',
      description: 'Мягкое отшелушивание и сужение пор',
      img: 'https://via.placeholder.com/366x160?text=366+x+160',
    },
    {
      title: 'Сыворотка The Ordinary',
      description: 'Ниацинамид 10% + Цинк 1%',
      img: 'https://via.placeholder.com/366x160?text=366+x+160',
    },
  ],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем наличие токена в localStorage при загрузке
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Моковая авторизация: всегда успешно, любые данные
  const login = async (email, password) => {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockProfile));
    setUser(mockProfile);
    return mockProfile;
  };

  const register = async (username, name, email, password) => {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockProfile));
    setUser(mockProfile);
    return mockProfile;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
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