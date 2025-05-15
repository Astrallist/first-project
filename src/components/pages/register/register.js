import React, { useState, useEffect, useRef } from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import { Button, PasswordInput, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/actions/auth';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Добавляем состояние для ошибки

const handleSubmit = (e) => {
  e.preventDefault();
  if (!valueEmail || !valuePassword || !valueName) {
    setError('Заполните все поля');
    return;
  }
  
  dispatch(registerUser({ 
    email: valueEmail, 
    password: valuePassword, 
    name: valueName 
  }))
    .then(() => navigate('/'))
    .catch((err) => {
      setError(err.message || 'Ошибка регистрации');
    });
};


  const [valueEmail, setValueEmail] = React.useState('')
  const onChangeEmail = e => {
    setValueEmail(e.target.value)
  }

  const [valuePassword, setValuePassword] = React.useState('')
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  const [valueName, setValueName] = React.useState('')
  const onChangeName = e => {
    setValueName(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.conteiner}>
      <p className="text text_type_main-medium">Регистрация</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Input
          onChange={onChangeName}
          value={valueName}
          type={'text'}
          placeholder={'Имя'}
          icon={false}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mt-6"
        />
        <EmailInput
          onChange={onChangeEmail}
          value={valueEmail}
          name={'email'}
          isIcon={false}
          extraClass="mb-6 mt-6"
        />
        <PasswordInput
          onChange={onChangePassword}
          value={valuePassword}
          name={'password'}
          extraClass="mb-6"
        />
      </div>
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Зарегистрироваться</Button>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to="/login"><Button extraClass={styles.buttonSecondary} htmlType="button" type="secondary" size="medium">Войти</Button></Link>
      </p>
    </form>
  );
};

export default Register;