import React from 'react';

import burgerIngredientsStyles from './burgerIngredients.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import data from '../../utils/data';

class BurgerIngredients extends React.Component {
	state = {
		ingredients: [],
		current: 'bun',
	};

	componentDidMount() {
		this.setState(prevState => ({
			...prevState,
			ingredients: data
		}));
	}

	renderIngredientsByType(type) {
		const { ingredients } = this.state;
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
			<div>
				<h2 className='text text_type_main-medium'>
					{types[type]}
				</h2>
				<ul className={burgerIngredientsStyles.list}>
					{filteredIngredients.map((ingredient) => (
						<li key={ingredient.id} className={burgerIngredientsStyles.card}>
							<img src={ingredient.image}></img>
							<p className='text text_type_digits-default'>
								{ingredient.price}
								<CurrencyIcon />
							</p>
							<p className='text text_type_main-default'>{ingredient.name}</p>
						</li>
					))}
				</ul>
			</div>
		);
	}

	chanceTab = (value) =>
		this.setState(prevState => ({
			...prevState,
			current: value
		}));


	render() {

		return (
			<>
				<div>
					<h1 className="text text_type_main-large">Соберите бургер</h1>
					<div style={{ display: 'flex' }}>
						<Tab value="bun" active={this.state.current === 'bun'} onClick={() => this.chanceTab('bun')}>
							Булки
						</Tab>
						<Tab value="sauce" active={this.state.current === 'sauce'} onClick={() => this.chanceTab('sauce')}>
							Соусы
						</Tab>
						<Tab value="main" active={this.state.current === 'main'} onClick={() => this.chanceTab('main')}>
							Начинки
						</Tab>
					</div>
					<div className={burgerIngredientsStyles.conteiner}>
						{this.renderIngredientsByType('bun')}
						{this.renderIngredientsByType('sauce')}
						{this.renderIngredientsByType('main')}
					</div>
				</div>
			</>
		);
	}
}

export default BurgerIngredients;
