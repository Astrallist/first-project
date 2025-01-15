import { useState } from 'react';

import AppHeader from '../components/appHeader/appHeader';
import BurgerIngredients from '../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/burgerConstructor';

export const App = () => {
	const [count, setCount] = useState(0);
	return (
		<>
			<AppHeader />
			<div className='content'>
				<BurgerIngredients />
				<BurgerConstructor />
			</div>
		</>
	);
};
