import { combineReducers } from 'redux';
import { ingredientsReducer } from '../reducers/ingredients';
import { constructorReducer } from '../reducers/constructor';
import { ingredientReducer } from '../reducers/ingredient';
import { orderReducer } from '../reducers/order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredient: ingredientReducer,
  order: orderReducer
});