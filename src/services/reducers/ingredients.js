import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  UPDATE_INGREDIENTS_COUNTERS 
} from '../actions/ingredients';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_INGREDIENTS_SUCCESS:
      return { ...state, items: action.payload, isLoading: false };
    case GET_INGREDIENTS_FAILED:
      return { ...state, error: action.payload, isLoading: false };
    case UPDATE_INGREDIENTS_COUNTERS:
      return {
        ...state,
        items: state.items.map(item => ({
          ...item,
          count: action.payload[item._id] || 0
        }))
      };
    default:
      return state;
  }
};