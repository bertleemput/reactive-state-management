import { ShopEffects } from './+state/shop.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { shopReducer, SHOP_FEATURE_KEY } from './+state/shop.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ProductCatalogComponent } from './product-catalog-component/product-catalog.component';
import { ShopComponent } from './shop-component/shop.component';

@NgModule({
  declarations: [AppComponent, ProductCatalogComponent, ShopComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(SHOP_FEATURE_KEY, shopReducer),
    EffectsModule.forRoot([ShopEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 25,
      name: 'Planning Store',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
