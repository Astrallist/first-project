import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from '../actions/ingredient';

const initialState = {
  item: null,
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return { ...state, item: action.payload };
    case CLEAR_CURRENT_INGREDIENT:
      return { ...state, item: null };
    default:
      return state;
  }
};