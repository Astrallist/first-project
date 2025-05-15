import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOrder from '../modalOrder/modalOrder';
import ModalIngredients from '../modalIngredients/modalIngredients';

const modalRoot = document.getElementById("react-modals");

const ModalOverlay = ({ children, onClose }) => {
	const handleOverlayClick = (event) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};
	return (
		< div className={styles.modalOverlay} onClick={handleOverlayClick} >
			{children}
		</div >
	)
}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
};

class Modal extends React.Component {

	handleKeyDown = (event) => {
		if (event.key === 'Escape') {
			this.props.onClose();
		}
	};

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	render() {
		const { type, content, onClose, orderNumber } = this.props;

		return ReactDOM.createPortal(
			(
				<>
					<ModalOverlay onClose={onClose}>
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
								{type === 'order' ? <ModalOrder orderNumber={orderNumber}></ModalOrder> : <></>}
							</div>
						</div>
					</ModalOverlay>
				</>
			),
			document.getElementById("react-modals")
		);




	}
}

Modal.propTypes = {
    type: PropTypes.oneOf(['ingredient', 'order']).isRequired,
    content: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    orderNumber: PropTypes.number
};

export default Modal;


