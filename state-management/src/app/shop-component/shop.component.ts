import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, Observable, of, Subject } from 'rxjs';
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
    const products$ = this.store.pipe(select(selectProducts));

    this.filteredProducts$ = combineLatest([
      products$,
      this.filterSubject.pipe(debounceTime(500), startWith('')),
    ]).pipe(
      map(([products, filter]) => {
        const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(filter.toLowerCase())
        );

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
