import React, { useState, useEffect, useRef } from 'react';
import styles from './notFound.module.css';
import { Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [valueEmail, setValueEmail] = React.useState('')
  const onChangeEmail = e => {
    setValueEmail(e.target.value)
  }

  const [valuePassword, setValuePassword] = React.useState('')
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  return (
    <div className={styles.conteiner}>
      <p className="text text_type_main-medium">Такой страницы не существует :(</p>
    </div>
  );
};

export default NotFound;