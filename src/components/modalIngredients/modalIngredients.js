import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modalIngredients.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class ModalIngredients extends React.Component {
	render() {
		const { content } = this.props;
		return (
			<>
			<div className={styles.conteiner}>
				<img src={content.image_large} alt={content.name} className={styles.image} />
				<h2 className='text text_type_main-medium mt-4 mb-8'>{content.name}</h2>
				<div className={styles.info}>
					<div>
						<p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
						<p className="text text_type_main-default text_color_inactive">{content.calories}</p>
					</div>
					<div>
						<p className="text text_type_main-default text_color_inactive">Белки, г</p>
						<p className="text text_type_main-default text_color_inactive">{content.proteins}</p>
					</div>
					<div>
						<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
						<p className="text text_type_main-default text_color_inactive">{content.fat}</p>
					</div>
					<div>
						<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
						<p className="text text_type_main-default text_color_inactive">{content.carbohydrates}</p>
					</div>
				</div>
				</div>
			</>
		);
	}
}

ModalIngredients.propTypes = {
	content: PropTypes.shape({
	  image_large: PropTypes.string.isRequired,
	  name: PropTypes.string.isRequired,
	  calories: PropTypes.number.isRequired,
	  proteins: PropTypes.number.isRequired,
	  fat: PropTypes.number.isRequired,
	  carbohydrates: PropTypes.number.isRequired,
	}).isRequired,
  };

  export default ModalIngredients;