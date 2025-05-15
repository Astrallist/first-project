export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

import { registerUserApi,
  loginUserApi,
  logoutUserApi,
  refreshTokenApi,
  getUserApi,
  updateUserApi } from '../../utils/api';

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const data = await getUserApi();
    dispatch({ type: GET_USER_SUCCESS, payload: data.user });
    return data;
  } catch (error) {
    dispatch({ type: GET_USER_FAILED });
    throw error;
  }
};

export const updateUser = (form) => (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  updateUserApi(form)
    .then(data => dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user }))
    .catch(() => dispatch({ type: UPDATE_USER_FAILED }));
};


export const registerUser = (form) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  return registerUserApi(form) 
    .then((data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
      return data; 
    })
    .catch((error) => {
      dispatch({ type: REGISTER_FAILED });
      throw error; 
    });
};

export const loginUser = (form) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return loginUserApi(form)
    .then((data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      return data;
    })
    .catch((error) => {
      dispatch({ type: LOGIN_FAILED });
      throw error;
    });
};

/*export const loginUser = (form) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  loginUserApi(form)
    .then((data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    })
    .catch(() => dispatch({ type: LOGIN_FAILED }));
};*/

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  const refreshToken = localStorage.getItem('refreshToken');
  logoutUserApi(refreshToken)
    .then(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch(() => dispatch({ type: LOGOUT_FAILED }));
};

export const refreshToken = () => async (dispatch) => {
  dispatch({ type: REFRESH_TOKEN_REQUEST });
  try {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    if (!refreshTokenValue) {
      throw new Error('No refresh token found');
    }
    
    const data = await refreshTokenApi(refreshTokenValue);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    dispatch({ type: REFRESH_TOKEN_SUCCESS });
    return data; 
  } catch (error) {
    dispatch({ type: REFRESH_TOKEN_FAILED });
    throw error; 
  }
};





export const forgotPassword = (email, onSuccess) => async (dispatch) => {
  try {
    const res = await fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      onSuccess();
    }
  } catch (err) {
    console.error('Ошибка восстановления пароля:', err);
  }
};

export const resetPassword = (password, token, onSuccess) => async (dispatch) => {
  try {
    const res = await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, token }),
    });
    const data = await res.json();
    if (data.success) {
      onSuccess();
    }
  } catch (err) {
    console.error('Ошибка сброса пароля:', err);
  }
};