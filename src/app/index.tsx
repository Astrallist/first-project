import { useState, useEffect } from 'react';

import AppHeader from '../components/appHeader/appHeader';
import BurgerIngredients from '../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/burgerConstructor';

const API = 'https://norma.nomoreparties.space/api';

export const App = () => {
	const [count, setCount] = useState(0);
	const [ingredients, setIngredients] = useState([]);
	const [error, setError] = useState(null);

	const fetchIngredients = async () => {
		try {
			const response = await fetch(`${API}/ingredients`); // Выполняем запрос
			if (!response.ok) {
				throw new Error(`Ошибка: ${response.status}`); // Обрабатываем ошибки HTTP
			}
			const data = await response.json();
			setIngredients(data.data);
		} catch (err:any) {
			setError(err.message);
		}
	};

	useEffect(() => {
		fetchIngredients();
	}, []);

	if (error) {
		return <div>Ошибка: {error}</div>;
	}



		return (
			<>
				<AppHeader />
				<div className='content'>
					<BurgerIngredients ingredients={ingredients}/>
					<BurgerConstructor ingredients={ingredients}/>
				</div>
			</>
		);
	}
