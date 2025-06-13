import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Profile from '../pages/Profile';
import Test from '../pages/Test';
import Articles from '../pages/Articles';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Product from '../pages/Product';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import ArticlesPage from '../pages/admin/ArticlesPage';
import SkincareProductsPage from '../pages/admin/SkincareProductsPage';
import IngredientsPage from '../pages/admin/IngredientsPage';
import AdminLayout from '../layouts/AdminLayout';

const MainLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname.startsWith('/admin');

  return (
    <div className="bg-gray-100 min-h-screen">
      {!isLoginPage && <Header />}
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<Test />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="skincare-products" element={<SkincareProductsPage />} />
            <Route path="ingredients" element={<IngredientsPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default MainLayout; 