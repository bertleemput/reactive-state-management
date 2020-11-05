import { requestProductsSuccess } from './shop.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { Product } from './models';

export interface ShopState {
  products: { [id: number]: Product };
}

const initialState: ShopState = {
  products: {},
};

const reducer = createReducer(
  initialState,
  on(requestProductsSuccess, (state, { products }) => {
    const updatedState = { ...state };
    updatedState.products = products.reduce((aggregation, product) => {
      aggregation[product.id] = product;
      return aggregation;
    }, {});

    return updatedState;
  })
);

export function shopReducer(state: ShopState, action: Action): ShopState {
  return reducer(state, action);
}
