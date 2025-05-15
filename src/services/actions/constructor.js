import { createOrderApi } from '../../utils/api';
import { updateIngredientsCounters } from './ingredients';
import { v4 as uuid4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_BUN = 'SET_BUN';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';


export const addIngredient = (ingredient) => (dispatch, getState) => {
  const ingredientWithUniqueId = {
    ...ingredient,
    uniqueId: uuid4(),
  };
  dispatch({ type: ADD_INGREDIENT, payload: ingredientWithUniqueId});
  updateCounters(dispatch, getState);
};

export const removeIngredient = (index) => (dispatch, getState) => {
  dispatch({ type: REMOVE_INGREDIENT, payload: index });
  updateCounters(dispatch, getState);
};

export const setBun = (bun) => ({
  type: SET_BUN,
  payload: bun,
});

export const clearConstructor = () => ({
  type: CLEAR_CONSTRUCTOR,
});

export const createOrder = (ingredientsIds) => (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  createOrderApi(ingredientsIds)
    .then((data) => {
      if (data.success && data.order && data.order.number) {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: data.order.number,
        });
      }
    })
};


export const UPDATE_COUNTERS = 'UPDATE_COUNTERS';

export const updateCounters = (dispatch, getState) => {
  const { burgerConstructor, ingredients } = getState();
  const counters = {};

  if (burgerConstructor.bun) {
    counters[burgerConstructor.bun._id] = 2;
  }

  burgerConstructor.ingredients.forEach(ing => {
    counters[ing._id] = (counters[ing._id] || 0) + 1;
  });

  dispatch(updateIngredientsCounters(counters));
};

export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const moveIngredient = (dragIndex, hoverIndex) => ({
  type: MOVE_INGREDIENT,
  payload: { dragIndex, hoverIndex }
});





