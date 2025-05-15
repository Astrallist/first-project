import React, { useState } from 'react';
import styles from './forgotPassword1.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPassword } from '../../../services/actions/auth';

const ForgotPassword1 = () => {
  const [valueEmail, setValueEmail] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valueEmail) {
      setError('Введите email');
      return;
    }
    dispatch(forgotPassword(valueEmail, () => navigate('/reset-password')));
  };

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <EmailInput
            onChange={(e) => setValueEmail(e.target.value)}
            value={valueEmail}
            placeholder={'Укажите e-mail'}
            name={'email'}
            extraClass="mb-6 mt-6"
          />
        </div>
        {error && (
          <p className="text text_type_main-default text_color_error mb-4">
            {error}
          </p>
        )}
        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to="/login"><Button extraClass={styles.buttonSecondary} htmlType="button" type="secondary" size="medium">Войти</Button></Link>
      </p>
    </div>
  );
};

export default ForgotPassword1;