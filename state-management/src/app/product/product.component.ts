import { ProductWithPrice } from './../product-catalog-component/product-catalog.component';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input()
  product: ProductWithPrice;
}
