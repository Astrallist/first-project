import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED } from '../actions/order';

const initialState = {
  number: null,
  isLoading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case CREATE_ORDER_SUCCESS:
      return { ...state, number: action.payload, isLoading: false };
    case CREATE_ORDER_FAILED:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};