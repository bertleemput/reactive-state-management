import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../+state/models';

export type ProductWithPrice = Product & { price: number };

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
})
export class ProductCatalogComponent {
  @Input()
  products: ProductWithPrice[];

  trackById(_, product): number {
    return product.id;
  }
}
