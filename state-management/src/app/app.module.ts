import { ShopEffects } from './+state/shop.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { shopReducer } from './+state/shop.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ shop: shopReducer }),
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
