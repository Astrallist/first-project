import React, { useState, useEffect, useRef } from 'react';
import styles from './home.module.css';
import { Link } from 'react-router-dom';
import { Button, PasswordInput, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from '../../appHeader/appHeader';
import BurgerIngredients from '../../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../../burgerConstructor/burgerConstructor';


const Home = () => {
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
    <>
      <div className='content'>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  );

};

export default Home;