import { createAction, props } from '@ngrx/store';
import { Product } from './models';

export const initializeShop = createAction('[Shop] Initialize');

export const requestProducts = createAction('[Shop] Request products');

export const requestProductsSuccess = createAction(
  '[Shop] Request products success',
  props<{ products: Product[] }>()
);

export const requestProductsFailure = createAction(
  '[Shop] Request products failure',
  props<{ error: string }>()
);

export const startPriceUpdates = createAction(
  '[Shop] Request product price updates'
);

export const priceUpdateReceived = createAction(
  '[Shop] Product price update received',
  props<{ priceUpdates: { productId: number; price: number }[] }>()
);
