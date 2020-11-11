import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  map,
  pairwise,
  startWith,
  withLatestFrom,
} from 'rxjs/operators';
import { AppState } from '../+state/shop.reducer';
import { selectPrices, selectProducts } from '../+state/shop.selectors';
import { roundTwoDecimals } from '../helper';
import { ExtendedProduct } from '../product-catalog-component/product-catalog.component';

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

  filteredProducts$: Observable<ExtendedProduct[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const prices$ = this.store.pipe(select(selectPrices));

    const priceDelta$ = prices$.pipe(
      pairwise(),
      map(([oldPrices, newPrices]) =>
        Object.keys(newPrices).reduce((aggregation, key) => {
          const newPrice = newPrices[key];
          const oldPrice = oldPrices[key];

          if (oldPrice !== undefined && newPrice !== undefined) {
            aggregation[key] = roundTwoDecimals(newPrice - oldPrice);
          }

          return aggregation;
        }, {} as { [id: string]: number })
      )
    );

    const products$ = this.store.pipe(select(selectProducts)).pipe(
      withLatestFrom(prices$, priceDelta$),
      map(([products, prices, priceDelta]) => {
        return products.map((product) => ({
          ...product,
          price: prices[product.id],
          priceDelta: priceDelta[product.id],
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

  filter(event: InputEvent): void {
    const filterText = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterText);
  }

  sort(event: InputEvent): void {
    const sortCriteria = (event.target as HTMLSelectElement).value;
    this.sortSubject.next(sortCriteria);
  }
}
