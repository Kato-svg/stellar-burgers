// src/components/ingredient-details/ingredient-details.tsx
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  // берём все ингредиенты из стора и ищем нужный по id из URL
  const ingredients = useSelector(selectIngredients);
  const ingredientData = ingredients.find((item) => item._id === id) ?? null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
