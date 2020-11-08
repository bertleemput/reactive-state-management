import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../+state/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): Observable<Product[]> {
    return of([
      { id: 1, name: 'Bike' },
      { id: 2, name: 'Chair' },
      { id: 3, name: 'Table' },
      { id: 4, name: 'Monitor' },
      { id: 5, name: 'Laptop' },
    ]);
  }
}
