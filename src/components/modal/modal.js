import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOrder from '../modalOrder/modalOrder';
import ModalIngredients from '../modalIngredients/modalIngredients';

const modalRoot = document.getElementById("react-modals");


class Modal extends React.Component {
	render() {
		const { type, content, onClose } = this.props;

			return ReactDOM.createPortal(
				(
					<>
					<div className={styles.modalOverlay}>
						<div className={styles.modalContent}>
							<div className={styles.title}>
									{type === 'ingredient' ? <h1 className='text text_type_main-large'>Детали ингридиента</h1> : <></>}
									{type === 'order' ? <h1 className='text text_type_main-large'></h1> : <></>}
								<button onClick={onClose} className={styles.closeButton}>
								<CloseIcon type="primary" />
								</button>
							</div>
							<div className={styles.content}>
								{type === 'ingredient' ? <ModalIngredients content={content}></ModalIngredients> : <></>}
								{type === 'order' ? <ModalOrder></ModalOrder> : <></>}
							</div>
						</div>
					</div>
					</>
				),
				document.getElementById("react-modals")
			);

		


	}
}



/*
const ModalWindow = ({ onClose, ingredient }) => {
  if (!ingredient) return null;

  return ReactDOM.createPortal(
	<div className={styles.modalOverlay}>
	  <div className={styles.modalContent}>
		<button onClick={onClose} className={styles.closeButton}>×</button>
		<h2>{ingredient.name}</h2>
		<img src={ingredient.image_large} alt={ingredient.name} />
		<p>Цена: {ingredient.price} ₽</p>
		<p>Калории: {ingredient.calories}</p>
		<p>Белки: {ingredient.proteins} г</p>
		<p>Жиры: {ingredient.fat} г</p>
		<p>Углеводы: {ingredient.carbohydrates} г</p>
	  </div>
	</div>,
	document.getElementById("react-modals")
  );
};*/

/*ModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  ingredient: PropTypes.object,
};*/

export default Modal;


