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
        { productId: 6, price: this.genPrice(500) },
      ];
    })
  );

  getProducts(): Observable<Product[]> {
    return of([
      { id: 1, name: 'PC', imageLocation: '/assets/images/pc.jpg' },
      { id: 2, name: 'Mouse', imageLocation: '/assets/images/mouse.jpg' },
      {
        id: 3,
        name: 'Keyboard',
        imageLocation: '/assets/images/keyboard.webp',
      },
      {
        id: 4,
        name: 'Monitor',
        imageLocation: '/assets/images/lg-monitor.jpg',
      },
      { id: 5, name: 'Laptop', imageLocation: '/assets/images/dell.webp' },
      { id: 6, name: 'Playstation', imageLocation: '/assets/images/ps5.png' },
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
