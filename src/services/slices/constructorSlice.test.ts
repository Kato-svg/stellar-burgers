import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './constructorSlice';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

describe('constructorSlice', () => {
  const bun: TIngredient = {
    _id: 'bun-1',
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
  };

  const mainIngredient: TIngredient = {
    _id: 'main-1',
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
  };

  const secondIngredient: TConstructorIngredient = {
    _id: 'main-2',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 90,
    image: 'sauce.png',
    image_mobile: 'sauce-mobile.png',
    image_large: 'sauce-large.png',
    id: 'ingredient-2'
  };

  test('должен добавлять булку в state.bun', () => {
    const state = constructorReducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
    expect(state.ingredients).toEqual([]);
  });

  test('должен добавлять начинку в state.ingredients', () => {
    const state = constructorReducer(undefined, addIngredient(mainIngredient));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...mainIngredient,
      id: expect.any(String)
    });
  });

  test('должен удалять ингредиент из state.ingredients по id', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          ...secondIngredient,
          id: 'ingredient-1'
        },
        {
          ...secondIngredient,
          id: 'ingredient-2'
        }
      ]
    };

    const state = constructorReducer(
      initialState,
      removeIngredient('ingredient-1')
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].id).toBe('ingredient-2');
  });

  test('должен перемещать ингредиент вверх', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          ...secondIngredient,
          _id: '1',
          name: 'Первый',
          id: 'ingredient-1'
        },
        {
          ...secondIngredient,
          _id: '2',
          name: 'Второй',
          id: 'ingredient-2'
        },
        {
          ...secondIngredient,
          _id: '3',
          name: 'Третий',
          id: 'ingredient-3'
        }
      ]
    };

    const state = constructorReducer(initialState, moveIngredientUp(1));

    expect(state.ingredients.map((item) => item.id)).toEqual([
      'ingredient-2',
      'ingredient-1',
      'ingredient-3'
    ]);
  });

  test('должен перемещать ингредиент вниз', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          ...secondIngredient,
          _id: '1',
          name: 'Первый',
          id: 'ingredient-1'
        },
        {
          ...secondIngredient,
          _id: '2',
          name: 'Второй',
          id: 'ingredient-2'
        },
        {
          ...secondIngredient,
          _id: '3',
          name: 'Третий',
          id: 'ingredient-3'
        }
      ]
    };

    const state = constructorReducer(initialState, moveIngredientDown(1));

    expect(state.ingredients.map((item) => item.id)).toEqual([
      'ingredient-1',
      'ingredient-3',
      'ingredient-2'
    ]);
  });

  test('должен очищать конструктор', () => {
    const initialState = {
      bun: {
        ...bun,
        id: 'bun-id'
      },
      ingredients: [
        {
          ...secondIngredient,
          id: 'ingredient-1'
        }
      ]
    };

    const state = constructorReducer(initialState, clearConstructor());

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
