import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ingredient.module.css';
import ModalIngredients from '../../modalIngredients/modalIngredients';
import PropTypes from 'prop-types';

const Ingredient = () => {
  const { id } = useParams();
  const ingredients = useSelector(state => state.ingredients.items);
  const ingredient = ingredients.find(item => item._id === id);

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  return (
    <div className={styles.container}>
      <ModalIngredients content={ingredient} />
    </div>
  );
};

export default Ingredient;

/*Ingredient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};*/