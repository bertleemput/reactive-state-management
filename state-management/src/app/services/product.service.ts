import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../+state/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  priceUpdate$ = timer(0, 5000).pipe(
    map(() => {
      return [
        { productId: 1, price: this.genPrice(399.5) },
        { productId: 2, price: this.genPrice(99.95) },
        { productId: 3, price: this.genPrice(150) },
        { productId: 4, price: this.genPrice(350) },
        { productId: 5, price: this.genPrice(1278) },
      ];
    })
  );

  getProducts(): Observable<Product[]> {
    return of([
      { id: 1, name: 'Bike' },
      { id: 2, name: 'Chair' },
      { id: 3, name: 'Table' },
      { id: 4, name: 'Monitor' },
      { id: 5, name: 'Laptop' },
    ]);
  }

  private genPrice(price): number {
    const newPrice = (0.75 + 0.25 * Math.random()) * price;
    return this.roundTwoDecimals(newPrice);
  }

  private roundTwoDecimals(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
