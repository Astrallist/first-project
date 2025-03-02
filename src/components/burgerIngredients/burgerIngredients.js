import React, { useState, useEffect } from 'react';

import burgerIngredientsStyles from './burgerIngredients.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';

const BurgerIngredients = ({ ingredients }) => {
	const [current, setCurrent] = useState('bun');
	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);

	const openIngredientModal = (ingredient) => {
		setSelectedIngredient(ingredient);
		setIsIngredientModalOpen(true);
	};

	const closeIngredientModal = () => {
		setSelectedIngredient(null);
		setIsIngredientModalOpen(false);
	};

	const renderIngredientsByType = (type) => {
		const filteredIngredients = ingredients.filter(
			(ingredient) => ingredient.type === type
		);

		if (filteredIngredients.length === 0) {
			return null;
		}

		const types = {
			bun: 'Булки',
			sauce: 'Соусы',
			main: 'Начинка',
		};

		return (
			<div className='pb-10'>
				<h2 className='text text_type_main-medium mb-6'>
					{types[type]}
				</h2>
				<ul className={burgerIngredientsStyles.list}>
					{filteredIngredients.map((ingredient) => (
						<li
							key={ingredient.id}
							className={burgerIngredientsStyles.card}
							onClick={() => openIngredientModal(ingredient)}
						>
							<img src={ingredient.image} className='mr-4 ml-4' alt={ingredient.name} />
							<Counter count={0} size="default" extraClass="m-1" />
							<p className='text text_type_digits-default mt-1 mb-1'>
								{ingredient.price}
								<CurrencyIcon type="primary" />
							</p>
							<p className='text text_type_main-default'>{ingredient.name}</p>
						</li>
					))}
				</ul>
			</div>
		);
	};

	const changeTab = (value) => {
		setCurrent(value);
	};

	return (
		<>
			<div className={burgerIngredientsStyles.burgerIngredientsView}>
				<h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
				<div style={{ display: 'flex' }}>
					<Tab value="bun" active={current === 'bun'} onClick={() => changeTab('bun')}>
						Булки
					</Tab>
					<Tab value="sauce" active={current === 'sauce'} onClick={() => changeTab('sauce')}>
						Соусы
					</Tab>
					<Tab value="main" active={current === 'main'} onClick={() => changeTab('main')}>
						Начинки
					</Tab>
				</div>
				<div className={burgerIngredientsStyles.conteiner}>
					{renderIngredientsByType('bun')}
					{renderIngredientsByType('sauce')}
					{renderIngredientsByType('main')}
				</div>
				{isIngredientModalOpen && (
					<Modal
						type='ingredient'
						content={selectedIngredient}
						onClose={closeIngredientModal}
					/>
				)}
			</div>
		</>
	);
};

export default BurgerIngredients;
