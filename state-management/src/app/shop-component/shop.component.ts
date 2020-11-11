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
  private collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });
  private filterSubject = new Subject<string>();
  private sortSubject = new Subject<string>();

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
      this.filterSubject.pipe(debounceTime(300), startWith('')),
      this.sortSubject.pipe(startWith('')),
    ]).pipe(
      map(([products, filter, sortCriteria]) => {
        const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(filter.toLowerCase())
        );

        filteredProducts.sort((a, b) => {
          if (sortCriteria === 'price') {
            return a.price < b.price ? -1 : 1;
          }

          if (sortCriteria === 'name') {
            return this.collator.compare(a.name, b.name);
          }

          return 0;
        });

        return filteredProducts;
      })
    );
  }

  filterProduct(event: InputEvent): void {
    const filterText = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterText);
  }

  sort(event: InputEvent): void {
    const sortCriteria = (event.target as HTMLSelectElement).value;
    this.sortSubject.next(sortCriteria);
  }
}
