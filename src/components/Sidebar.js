import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Статьи', path: '/admin/articles' },
    { name: 'Уходовые средства', path: '/admin/skincare-products' },
    { name: 'Ингредиенты', path: '/admin/ingredients' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col justify-between py-6">
      <div>
        <div className="text-gray-800 text-2xl font-bold px-6 mb-8">AdminPanel</div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="mb-2">
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-100 ${location.pathname.startsWith(item.path) ? 'bg-indigo-100 text-indigo-700' : ''}`}
                >
                  {/* Иконки можно добавить здесь */}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="px-6">
        <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-md">
          <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">A</div>
          <div>
            <div className="text-gray-800 font-semibold">Администратор</div>
            <div className="text-gray-500 text-sm">admin@glowflow.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 