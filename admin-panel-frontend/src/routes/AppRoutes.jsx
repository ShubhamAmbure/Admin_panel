
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import DashboardLayout from '../layouts/DashboardLayout';
import Categories from '../pages/Categories';
import Subcategories from '../pages/Subcategories';
import Products from '../pages/Products';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="subcategories" element={<Subcategories />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
