import React, { useState, useEffect, useRef } from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { CurrencyIcon, Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIngredient } from '../../services/actions/ingredient';
import { useDrag } from 'react-dnd';

const BurgerIngredients = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = useState('bun');
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const { bun, ingredients: constructorIngredients } = useSelector(state => state.burgerConstructor);

  const getIngredientCounts = () => {
    const counts = {};

    if (bun) {
      counts[bun._id] = 2;
    }

    constructorIngredients.forEach(ing => {
      counts[ing._id] = (counts[ing._id] || 0) + 1;
    });

    return counts;
  };

  const ingredientsWithCount = ingredients.map(ing => ({
    ...ing,
    count: getIngredientCounts()[ing._id] || 0
  }));

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const containerRef = useRef(null);


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      const bunDistance = Math.abs(bunRef.current.getBoundingClientRect().top - containerTop);
      const sauceDistance = Math.abs(sauceRef.current.getBoundingClientRect().top - containerTop);
      const mainDistance = Math.abs(mainRef.current.getBoundingClientRect().top - containerTop);

      const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);

      if (minDistance === bunDistance) setCurrentTab('bun');
      else if (minDistance === sauceDistance) setCurrentTab('sauce');
      else setCurrentTab('main');
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const openIngredientModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIsIngredientModalOpen(true);
  };

  const closeIngredientModal = () => {
    setSelectedIngredient(null);
    setIsIngredientModalOpen(false);
  };

  const IngredientCard = ({ ingredient }) => {
    const [{ isDrag }, dragRef] = useDrag({
      type: 'ingredient',
      item: { ingredient },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    });

    return (
      <li
        ref={dragRef}
        key={ingredient._id}
        className={`${burgerIngredientsStyles.card} ${isDrag ? burgerIngredientsStyles.dragging : ''}`}
        onClick={() => openIngredientModal(ingredient)}
      >
        <img src={ingredient.image} className='mr-4 ml-4' alt={ingredient.name} />
        {ingredient.count !== 0 && <Counter count={ingredient.count || 0} size="default" extraClass="m-1" />}
        <p className='text text_type_digits-default mt-1 mb-1'>
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </p>
        <p className='text text_type_main-default'>{ingredient.name}</p>
      </li>
    );
  };

  const renderIngredientsByType = (type) => {
    const filteredIngredients = ingredientsWithCount.filter(
      (ingredient) => ingredient.type === type
    );

    if (filteredIngredients.length === 0) return null;

    const types = {
      bun: 'Булки',
      sauce: 'Соусы',
      main: 'Начинки',
    };

    return (
      <div className='pb-10' ref={type === 'bun' ? bunRef : type === 'sauce' ? sauceRef : mainRef}>
        <h2 className='text text_type_main-medium mb-6'>
          {types[type]}
        </h2>
        <ul className={burgerIngredientsStyles.list}>
          {filteredIngredients.map((ingredient) => (
            <IngredientCard key={ingredient._id} ingredient={ingredient} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className={burgerIngredientsStyles.burgerIngredientsView}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div style={{ display: 'flex' }}>
          <Tab value="bun" active={currentTab === 'bun'} onClick={() => { }}>
            Булки
          </Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={() => { }}>
            Соусы
          </Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={() => { }}>
            Начинки
          </Tab>
        </div>
        <div
          className={burgerIngredientsStyles.container}
          ref={containerRef}
          style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 284px)' }}
        >
          {renderIngredientsByType('bun')}
          {renderIngredientsByType('sauce')}
          {renderIngredientsByType('main')}
        </div>
      </div>

      {isIngredientModalOpen && (
        <Modal
          type='ingredient'
          content={selectedIngredient}
          onClose={closeIngredientModal}
        />
      )}
    </>
  );
};

export default BurgerIngredients;