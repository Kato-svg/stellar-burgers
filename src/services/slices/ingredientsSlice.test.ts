import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientsSlice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 10,
      fat: 20,
      carbohydrates: 30,
      calories: 40,
      price: 1255,
      image: 'bun.png',
      image_mobile: 'bun-mobile.png',
      image_large: 'bun-large.png'
    },
    {
      _id: '2',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 20,
      fat: 30,
      carbohydrates: 40,
      calories: 50,
      price: 424,
      image: 'main.png',
      image_mobile: 'main-mobile.png',
      image_large: 'main-large.png'
    }
  ];

  test('должен обрабатывать pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  test('должен обрабатывать fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      ingredients: mockIngredients,
      isLoading: false,
      error: null
    });
  });

  test('должен обрабатывать rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки ингредиентов' }
    };

    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Ошибка загрузки ингредиентов'
    });
  });
});
