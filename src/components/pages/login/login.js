import React, { useState } from 'react';
import styles from './login.module.css';
import { Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../services/actions/auth';

const Login = () => {
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

const dispatch = useDispatch();
const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!valueEmail || !valuePassword) {
      setError('Заполните все поля');
      return;
    }

    dispatch(loginUser({ 
      email: valueEmail, 
      password: valuePassword 
    }))
      .then(() => navigate('/'))
      .catch((err) => {
        setError(err.message || 'Ошибка авторизации');
      });
  };


  

  return (
    <form onSubmit={handleSubmit} className={styles.conteiner}>
      <p className="text text_type_main-medium">Вход</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <EmailInput
          onChange={(e) => setValueEmail(e.target.value)}
          value={valueEmail}
          name={'email'}
          isIcon={false}
          extraClass="mb-6 mt-6"
        />
        <PasswordInput
          onChange={(e) => setValuePassword(e.target.value)}
          value={valuePassword}
          name={'password'}
          extraClass="mb-6"
        />
      </div>
      
      {error && (
        <p className="text text_type_main-default text_color_error mb-4">
          {error}
        </p>
      )}

      <Button 
        htmlType="submit"
        type="primary" 
        size="medium" 
        extraClass="mb-20"
      >
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <Link to="/register"><Button extraClass={styles.buttonSecondary} htmlType="button" type="secondary" size="medium">Зарегистрироваться</Button></Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to="/forgot-password"><Button extraClass={styles.buttonSecondary} htmlType="button" type="secondary" size="medium">Восстановить пароль</Button></Link>
      </p>
    </form>
  );
};

export default Login;