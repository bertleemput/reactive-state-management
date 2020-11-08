import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import {
  initializeShop,
  priceUpdateReceived,
  startPriceUpdates,
  requestProducts,
  requestProductsFailure,
  requestProductsSuccess,
} from './shop.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';

@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  initializeStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initializeShop),
      mergeMap(() => [requestProducts(), startPriceUpdates()])
    )
  );

  requestProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) => requestProductsSuccess({ products })),
          catchError(() =>
            of(requestProductsFailure({ error: 'Some message' }))
          )
        )
      )
    )
  );

  requestPriceUpdates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startPriceUpdates),
      switchMap(() =>
        this.productService.priceUpdate$.pipe(
          map((priceUpdates) => priceUpdateReceived({ priceUpdates }))
        )
      )
    )
  );
}
