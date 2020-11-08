import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../+state/shop.reducer';
import { selectPrices, selectProducts } from '../+state/shop.selectors';
import { ProductWithPrice } from '../product-catalog-component/product-catalog.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  private filterSubject = new Subject<string>();
  filteredProducts$: Observable<ProductWithPrice[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const prices$ = this.store.pipe(select(selectPrices));

    const products$ = this.store.pipe(select(selectProducts)).pipe(
      withLatestFrom(prices$),
      map(([products, prices]) => {
        return products.map((product) => ({
          ...product,
          price: prices[product.id],
        }));
      })
    );

    this.filteredProducts$ = combineLatest([
      products$,
      this.filterSubject.pipe(debounceTime(200), startWith('')),
    ]).pipe(
      map(([products, filter]) =>
        products.filter((product) =>
          product.name.toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }

  filterProduct(event: InputEvent): void {
    const filterText = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterText);
  }
}
