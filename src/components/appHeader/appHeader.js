import React from 'react';

import appHeaderStyles from './appHeader.module.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
    render() {
      return (
        <header className={appHeaderStyles.header}>
          <div className={appHeaderStyles.headerConteiner}>
            <div className={appHeaderStyles.startElements}>
              <div className='pl-5 pr-5 pb-5 pt-5 mb-4 mt-4'>
                <BurgerIcon type="primary" className='mr-2'/>
                <span className="text text_type_main-default pb-2 pt-2">Конструктор</span>
              </div>
              <div className='pl-5 pr-5 pb-5 pt-5 mb-4 mt-4'>
              <ListIcon type="secondary" className='mr-2'/>
              <span className="text text_type_main-default text_color_inactive"> Лента заказов</span>
              </div>
            </div>
            <div className={appHeaderStyles.logo}>
                <Logo />
            </div>
            <div className={appHeaderStyles.endElements}>
              <div className='pl-5 pr-5 pb-5 pt-5 mb-4 mt-4'>
                <ProfileIcon type="secondary" className='mr-2'/>              
                <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
              </div>
            </div>
            </div>
        </header>
      );
    }
  }
  
  export default AppHeader;