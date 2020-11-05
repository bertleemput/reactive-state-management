import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../+state/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): Observable<Product[]> {
    return of([
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ]);
  }
}
