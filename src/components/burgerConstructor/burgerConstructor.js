import React, { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyles from './burgerConstructor.module.css';
import Modal from '../modal/modal';
import {
  addIngredient, setBun, removeIngredient, createOrder,
  moveIngredient
} from '../../services/actions/constructor';
import PropTypes from 'prop-types';

const SortableIngredient = ({ ingredient, index, onRemove }) => {
  const ref = React.useRef(null);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorIngredient',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'constructorIngredient',
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(moveIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`${burgerConstructorStyles.elementLine} ${isDragging ? burgerConstructorStyles.dragging : ''}`}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onRemove(index)}
      />
    </div>
  );
};

SortableIngredient.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
    uniqueId: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, ingredients, orderRequest } = useSelector(state => state.burgerConstructor);
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);
  const { orderNumber } = useSelector(state => state.burgerConstructor);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      handleDrop(item.ingredient);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleDrop = useCallback((ingredient) => {
    if (ingredient.type === 'bun') {
      dispatch(setBun(ingredient));
    } else {
      dispatch(addIngredient(ingredient));
    }
  }, [dispatch]);

  const handleRemove = (index) => {
    dispatch(removeIngredient(index));
  };

  const handleOrderSubmit = () => {
    if (!bun || ingredients.length === 0) return;

    const orderIngredients = [
      bun._id,
      ...ingredients.map(item => item._id),
      bun._id
    ];

    dispatch(createOrder(orderIngredients));
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const renderBun = (position) => {
    if (!bun) return (
      <div className={`${burgerConstructorStyles.elementLine} ${position === 'top' ? 'mb-4' : 'mt-4'}`}>
        <div className={burgerConstructorStyles.elementFake}></div>
      </div>
    );

    return (
      <div className={`${burgerConstructorStyles.elementLine} ${position === 'top' ? 'mb-4' : 'mt-4'}`}>
        <div className={burgerConstructorStyles.elementFake}></div>
        <ConstructorElement
          type={position}
          isLocked={true}
          text={`${bun.name} (${position === 'top' ? 'верх' : 'низ'})`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    );
  };

  const renderIngredients = () => {
    if (ingredients.length === 0) {
      return (
        <div className={burgerConstructorStyles.emptyIngredientsPlaceholder}>
        </div>
      );
    }

    return ingredients.map((ingredient, index) => (
      <SortableIngredient
        key={ingredient.uniqueId}
        ingredient={ingredient}
        index={index}
        onRemove={handleRemove}
      />
    ));
  };

  const calculateTotal = () => {
    const bunPrice = bun ? bun.price : 0;
    const ingredientsPrice = ingredients.reduce((sum, item) => sum + item.price, 0);
    return bunPrice + ingredientsPrice;
  };

  return (
    <div className={burgerConstructorStyles.burgerConstructorView}>
      <ul
        ref={dropTarget}
        className={`${burgerConstructorStyles.container} ${isHover ? burgerConstructorStyles.hover : ''}`}
      >
        {renderBun('top')}
        <div className={burgerConstructorStyles.list}>
          {renderIngredients()}
        </div>
        {renderBun('bottom')}
      </ul>

      <div className={burgerConstructorStyles.results}>
        <p className='text text_type_digits-medium mr-2'>{calculateTotal()}</p>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderSubmit}
          disabled={!bun || ingredients.length === 0 || orderRequest}
        >
          {orderRequest ? 'Оформляем...' : 'Оформить заказ'}
        </Button>
      </div>

      {isOrderModalOpen && (
        <Modal type="order" onClose={closeOrderModal} orderNumber={orderNumber}>
          <p className="text text_type_main-medium">Заказ оформлен!</p>
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
