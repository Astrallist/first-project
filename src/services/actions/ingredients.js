import { getIngredientsApi } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const UPDATE_INGREDIENTS_COUNTERS = 'UPDATE_INGREDIENTS_COUNTERS';

export const getIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });

  getIngredientsApi()
    .then((data) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        payload: error.message,
      });
    });
};

export const updateIngredientsCounters = (counters) => ({
  type: UPDATE_INGREDIENTS_COUNTERS,
  payload: counters
});