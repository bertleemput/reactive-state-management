import { priceUpdateReceived, requestProductsSuccess } from './shop.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { Product } from './models';

export const SHOP_FEATURE_KEY = 'shop';

export interface AppState {
  [SHOP_FEATURE_KEY]: ShopState;
}

export interface ShopState {
  products: { [id: number]: Product };
  prices: { [id: number]: number };
}

const initialState: ShopState = {
  products: {},
  prices: {},
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
  }),
  on(priceUpdateReceived, (state, { priceUpdates }) => {
    const updatedState = { ...state };

    updatedState.prices = priceUpdates.reduce((aggregation, price) => {
      aggregation[price.productId] = price.price;
      return aggregation;
    }, {});

    return updatedState;
  })
);

export function shopReducer(state: ShopState, action: Action): ShopState {
  return reducer(state, action);
}
