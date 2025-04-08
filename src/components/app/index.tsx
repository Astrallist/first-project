import { useState, useEffect } from 'react';

import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';

import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';



export const App = () => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch<any>();

	useEffect(() => {
	  dispatch(getIngredients());
	}, [dispatch]);

	if (error) {
		return <div>Ошибка: {error}</div>;
	}



	return (
		<>
			<AppHeader />
			<div className='content'>
				<BurgerIngredients/>
				<BurgerConstructor />
			</div>
		</>
	);
}
