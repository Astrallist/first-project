import { createOrderApi } from '../../utils/api'; 

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const createOrder = (ingredients) => (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  createOrderApi(ingredients)
    .then((data) => {
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data.order.number,
      });
    })
    .catch((error) => {
      dispatch({
        type: CREATE_ORDER_FAILED,
        payload: error.message,
      });
    });
};