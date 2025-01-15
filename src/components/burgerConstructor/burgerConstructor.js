import React from 'react';

import burgerConstructorStyles from './burgerConstructor.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.Component {
	state = {
		ingredients: [
			{
				"_id": "60666c42cc7b410027a1a9b1",
				"name": "Краторная булка N-200i",
				"type": "bun",
				"proteins": 80,
				"fat": 24,
				"carbohydrates": 53,
				"calories": 420,
				"price": 1255,
				"image": "https://code.s3.yandex.net/react/code/bun-02.png",
				"image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
				"image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
				"__v": 0
			},
			{
				"_id": "60666c42cc7b410027a1a9b9",
				"name": "Соус традиционный галактический",
				"type": "sauce",
				"proteins": 42,
				"fat": 24,
				"carbohydrates": 42,
				"calories": 99,
				"price": 15,
				"image": "https://code.s3.yandex.net/react/code/sauce-03.png",
				"image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
				"image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
				"__v": 0
			},
			{
				"_id": "60666c42cc7b410027a1a9b4",
				"name": "Мясо бессмертных моллюсков Protostomia",
				"type": "main",
				"proteins": 433,
				"fat": 244,
				"carbohydrates": 33,
				"calories": 420,
				"price": 1337,
				"image": "https://code.s3.yandex.net/react/code/meat-02.png",
				"image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
				"image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
				"__v": 0
			},
			{
				"_id": "60666c42cc7b410027a1a9bc",
				"name": "Плоды Фалленианского дерева",
				"type": "main",
				"proteins": 20,
				"fat": 5,
				"carbohydrates": 55,
				"calories": 77,
				"price": 874,
				"image": "https://code.s3.yandex.net/react/code/sp_1.png",
				"image_mobile": "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
				"image_large": "https://code.s3.yandex.net/react/code/sp_1-large.png",
				"__v": 0
			},
			{
				"_id": "60666c42cc7b410027a1a9bb",
				"name": "Хрустящие минеральные кольца",
				"type": "main",
				"proteins": 808,
				"fat": 689,
				"carbohydrates": 609,
				"calories": 986,
				"price": 300,
				"image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
				"image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
				"image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
				"__v": 0
			},
			{
				"_id": "60666c42cc7b410027a1a9bb",
				"name": "Хрустящие минеральные кольца",
				"type": "main",
				"proteins": 808,
				"fat": 689,
				"carbohydrates": 609,
				"calories": 986,
				"price": 300,
				"image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
				"image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
				"image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
				"__v": 0
			},
			{
				"_id": "60666c42cc7b410027a1a9bb",
				"name": "Хрустящие минеральные кольца",
				"type": "main",
				"proteins": 808,
				"fat": 689,
				"carbohydrates": 609,
				"calories": 986,
				"price": 300,
				"image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
				"image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
				"image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
				"__v": 0
			},
		],
	};

	renderSelectedIngredients(type, bunType) {
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
			<>
				{filteredIngredients.map((ingredient) => (
					<div className={burgerConstructorStyles.elementLine}>
						{!bunType ? <DragIcon /> : <div className={burgerConstructorStyles.elementFake}></div>}
						<ConstructorElement
							type={bunType}
							isLocked={bunType}
							text={bunType ? `${ingredient.name} ${bunType === 'top' ? '(вверх)' : '(низ)'}` : `${ingredient.name}`}
							price={ingredient.price}
							thumbnail={ingredient.image}
						/>
					</div>





				))}
			</>
		);
	}

	render() {

		return (
			<div className={burgerConstructorStyles.burgerConstructorView}>
				<ul className={burgerConstructorStyles.container}>
					<div className='mb-4'>
						{this.renderSelectedIngredients('bun', 'top')}
					</div>
					<div className={burgerConstructorStyles.list}>
						{this.renderSelectedIngredients('sauce')}
						{this.renderSelectedIngredients('main')}
					</div>
					<div className='mt-4'>
						{this.renderSelectedIngredients('bun', 'bottom')}
					</div>
				</ul>
				<div className={burgerConstructorStyles.results}>
					<p className='text text_type_digits-medium'>
						5336
					</p>
					<CurrencyIcon className={burgerConstructorStyles.bigIcon} />
					<Button htmlType="button" type="primary" size="large">
						Оформить заказ
					</Button>
				</div>
			</div>
		);
	}
}


export default BurgerConstructor;
