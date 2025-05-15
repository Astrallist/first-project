import React, { useState, useEffect, useRef } from 'react';
import styles from './profile.module.css';
import { CurrencyIcon, Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import { Button, PasswordInput, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../../appHeader/appHeader';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {logoutUser} from '../../../services/actions/auth';

const Profile = () => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateUser(form));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({ name: user.name, email: user.email });
    setIsEditing(false);
  };


  const navigate = useNavigate();
  

const handleLogout = () => {
  dispatch(logoutUser()).then(() => navigate('/login'));
};

  const [valueEmail, setValueEmail] = React.useState('')
  const onChangeEmail = e => {
    setValueEmail(e.target.valueEmail)
  }

  const [valuePassword, setValuePassword] = React.useState('')
  const onChangePassword = e => {
    setValuePassword(e.target.valuePassword)
  }

  const [valueName, setValueName] = React.useState('')
  const onChangeName = e => {
    setValueName(e.target.valueName)
  }

  return (
    <>
      <div className='content'>
        <div className={styles.conteiner}>
          <div className={styles.menu}>
            <div className={styles.titles}>
              <NavLink
            to="/profile"
            className={({ isActive }) => 
              isActive 
                ? 'text text_type_main-medium' 
                : 'text text_type_main-medium text_color_inactive'
            }
            end
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) => 
              isActive 
                ? 'text text_type_main-medium' 
                : 'text text_type_main-medium text_color_inactive'
            }
          >
            История заказов
          </NavLink>
          <button 
            onClick={handleLogout}
            className='text text_type_main-medium text_color_inactive'
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Выход
          </button>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
            </div>
            <div className={styles.forms}>
              <Input
                onChange={onChangeName}
                value={valueName}
                type={'text'}
                placeholder={'Имя'}
                icon={'EditIcon'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mt-6"
              />
              <EmailInput
                onChange={onChangeEmail}
                value={valueEmail}
                name={'email'}
                isIcon={'EditIcon'}
                placeholder={'Логин'}
                extraClass="mb-6 mt-6"
              />
              <PasswordInput
                onChange={onChangePassword}
                value={valuePassword}
                name={'password'}
                icon={'EditIcon'}
                isIcon={'EditIcon'}
                extraClass="mb-6"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Profile;

/*
Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  }),
  logoutUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};*/