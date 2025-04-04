import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modalOrder.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("react-modals");

class ModalOrder extends React.Component {
	render() {
		const { orderNumber, onClose } = this.props;

		return (
			<div className={styles.content}>
				<p className="text text_type_digits-large">{orderNumber}</p>
				<h2 className="text text_type_main-medium">идефикатор заказа</h2>
				<img  className={styles.img} src={require('../../images/successfully.png')}></img>
				<p className="text text_type_main-small">Ваш заказ начали готовить</p>
				<p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
			</div>
		)
	}
}
ModalOrder.propTypes = {
	orderNumber: PropTypes.number,
	onClose: PropTypes.func.isRequired
  };
  
export default ModalOrder;


