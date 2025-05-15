const API = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export const getIngredientsApi = () => {
  return request(`${API}/ingredients`);
};

export const createOrderApi = (ingredientsIds) => {
  return request(`${API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientsIds }),
  });
};










export const registerUserApi = (form) => {
  return request(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
};

export const loginUserApi = (form) => {
  return request(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
};

export const logoutUserApi = (token) => {
  return request(`${API}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
};

export const refreshTokenApi = (token) => {
  return request(`${API}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
};


export const getUserApi = () => {
  return request(`${API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('accessToken')
    }
  });
};

export const updateUserApi = (form) => {
  return request(`${API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify(form)
  });
};
