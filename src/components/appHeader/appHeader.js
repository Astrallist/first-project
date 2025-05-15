import React from 'react';

import appHeaderStyles from './appHeader.module.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

class AppHeader extends React.Component {
  render() {
    return (
      <header className={appHeaderStyles.header}>
        <div className={appHeaderStyles.headerConteiner}>
          <div className={appHeaderStyles.startElements}>
            <Link to="/home" className={appHeaderStyles.headerElement}>
              <BurgerIcon type="primary" className='mr-2' />
              <span className="text text_type_main-default mb-2 mt-2">Конструктор</span>
            </Link>
            <Link to="/*" className={appHeaderStyles.headerElement}>
              <ListIcon type="secondary" className='mr-2' />
              <span className="text text_type_main-default text_color_inactive">Лента заказов</span>
            </Link>
          </div>
          <div className={appHeaderStyles.logo}>
            <Link to="/home">
              <Logo />
            </Link>
          </div>
          <div className={appHeaderStyles.endElements}>
            <Link to="/profile" className={appHeaderStyles.headerElement}>
              <ProfileIcon type="secondary" className='mr-2' />
              <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default AppHeader;