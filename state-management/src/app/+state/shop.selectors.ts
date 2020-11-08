import { createSelector } from '@ngrx/store';
import { AppState, ShopState } from './shop.reducer';

export const selectShopFeature = (state: AppState) => {
  return state.shop;
};

export const selectProducts = createSelector(
  selectShopFeature,
  (shopState: ShopState) => Object.values(shopState.products)
);
