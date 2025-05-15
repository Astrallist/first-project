import React, { useState } from 'react';
import styles from './forgotPassword2.module.css';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { resetPassword } from '../../../services/actions/auth';

const ForgotPassword2 = () => {
  const [valuePassword, setValuePassword] = useState('');
  const [valueToken, setValueToken] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valuePassword || !valueToken) {
      setError('Заполните все поля');
      return;
    }
    dispatch(resetPassword(valuePassword, valueToken, () => navigate('/login')));
  };

  return (
    <div className={styles.conteiner}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <PasswordInput
            onChange={(e) => setValuePassword(e.target.value)}
            value={valuePassword}
            placeholder={'Введите новый пароль'}
            name={'password'}
            extraClass="mb-6 mt-6"
          />
          <Input
            onChange={(e) => setValueToken(e.target.value)}
            value={valueToken}
            type={'text'}
            placeholder={'Введите код из письма'}
            extraClass="mb-6"
          />
        </div>
        {error && (
          <p className="text text_type_main-default text_color_error mb-4">
            {error}
          </p>
        )}
        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to="/login"><Button extraClass={styles.buttonSecondary} htmlType="button" type="secondary" size="medium">Войти</Button></Link>
      </p>
    </div>
  );
};

export default ForgotPassword2;