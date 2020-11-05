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
