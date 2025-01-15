import clsx from 'clsx';
import { useState } from 'react';
import s from './app.module.scss';
import reactLogo from './assets/react.svg';
import { ReactComponent as TypescriptLogo } from './assets/typescript.svg';

import AppHeader from '../components/appHeader/appHeader';
import BurgerIngredients from '../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/burgerConstructor';

export const App = () => {
	// const num = 0
	const [count, setCount] = useState(0);
	return (
		<>
			<AppHeader/>
			<div className='content'>
				<BurgerIngredients/>
				<BurgerConstructor/>
			</div>
		</>
	);
};
