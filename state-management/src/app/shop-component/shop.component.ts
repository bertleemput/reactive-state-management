import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product } from '../+state/models';
import { AppState } from '../+state/shop.reducer';
import { selectProducts } from '../+state/shop.selectors';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  private filterSubject = new Subject<string>();
  filteredProducts$: Observable<Product[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const products$ = this.store.pipe(select(selectProducts));

    this.filteredProducts$ = combineLatest([
      products$,
      this.filterSubject.pipe(startWith('')),
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
