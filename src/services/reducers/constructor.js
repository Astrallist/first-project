import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_BUN,
  CLEAR_CONSTRUCTOR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  MOVE_INGREDIENT
} from '../actions/constructor';

const initialState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderFailed: false,
  orderNumber: null
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((_, i) => i !== action.payload),
      };

    case SET_BUN:
      return { ...state, bun: action.payload };

    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        bun: null,
        ingredients: [],
        orderNumber: null
      };

    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.payload,
        orderRequest: false
      };

    case CREATE_ORDER_FAILED:
      return {
        ...state,
        orderFailed: true,
        orderRequest: false
      };

    case MOVE_INGREDIENT:
      const { dragIndex, hoverIndex } = action.payload;
      const newIngredients = [...state.ingredients];
      const draggedItem = newIngredients[dragIndex];

      newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, draggedItem);

      return {
        ...state,
        ingredients: newIngredients
      };


    default:
      return state;
  }
};

