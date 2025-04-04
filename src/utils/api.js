const API = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

// Получить список ингредиентов
export const getIngredientsApi = () => {
  return request(`${API}/ingredients`);
};

// Создать заказ
export const createOrderApi = (ingredientsIds) => {
  return request(`${API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientsIds }),
  });
};