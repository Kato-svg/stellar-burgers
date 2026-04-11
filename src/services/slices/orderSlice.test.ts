import orderReducer, {
  createOrder,
  getOrderByNumber,
  clearOrderModalData
} from './orderSlice';
import { TOrder } from '../../utils/types';

describe('orderSlice', () => {
  const mockOrder: TOrder = {
    _id: 'order-1',
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['1', '2', '3']
  };

  test('должен обрабатывать createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(undefined, action);

    expect(state).toEqual({
      orderRequest: true,
      orderModalData: null
    });
  });

  test('должен обрабатывать createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    };

    const state = orderReducer(undefined, action);

    expect(state).toEqual({
      orderRequest: false,
      orderModalData: mockOrder
    });
  });

  test('должен обрабатывать createOrder.rejected', () => {
    const initialState = {
      orderRequest: true,
      orderModalData: null
    };

    const action = {
      type: createOrder.rejected.type
    };

    const state = orderReducer(initialState, action);

    expect(state).toEqual({
      orderRequest: false,
      orderModalData: null
    });
  });

  test('должен обрабатывать getOrderByNumber.fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrder
    };

    const state = orderReducer(undefined, action);

    expect(state).toEqual({
      orderRequest: false,
      orderModalData: mockOrder
    });
  });

  test('должен очищать orderModalData через clearOrderModalData', () => {
    const initialState = {
      orderRequest: false,
      orderModalData: mockOrder
    };

    const state = orderReducer(initialState, clearOrderModalData());

    expect(state).toEqual({
      orderRequest: false,
      orderModalData: null
    });
  });
});
