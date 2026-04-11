import { rootReducer } from './store';

describe('rootReducer', () => {
  test('должен возвращать корректное начальное состояние при неизвестном экшене', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false
      },
      user: {
        isAuthChecked: false,
        user: null,
        loginError: null,
        registerError: null
      },
      order: {
        orderRequest: false,
        orderModalData: null
      },
      userOrders: {
        orders: [],
        isLoading: false
      }
    });
  });
});
