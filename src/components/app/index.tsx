import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';

import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

import Login from '../pages/login/login';
import Register from '../pages/register/register';
import ForgotPassword1 from '../pages/forgotPassword1/forgotPassword1';
import ForgotPassword2 from '../pages/forgotPassword2/forgotPassword2';
import Profile from '../pages/profile/profile';

import ModalIngredients from '../modalIngredients/modalIngredients';
import NotFound from '../pages/notFound/notFound';
import Home from '../pages/home/home';
import Ingredient from '../pages/ingredient/ingredient';

import { refreshToken, getUser } from '../../services/actions/auth';

export const App = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const checkAuth = async () => {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (refreshTokenValue) {
        try {
          await dispatch(refreshToken());
          await dispatch(getUser());
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <Router>
      <AppHeader />
      <div className='conteiner'>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword1 />} />
          <Route path="/reset-password" element={<ForgotPassword2 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ingredients/:id" element={<Ingredient />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}