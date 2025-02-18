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


export default Modal;


