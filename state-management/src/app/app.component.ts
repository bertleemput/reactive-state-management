import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { initializeShop } from './+state/shop.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'state-management';

  constructor(store: Store<unknown>) {
    store.dispatch(initializeShop());
  }
}
