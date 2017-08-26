import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppEffects } from './store/app.effect';
import { reducer } from './store/app.reducer';

import { AppComponent } from './app.component';
import { AppService } from './services/app.service';
import { AppServiceEffect } from './store/app.service-effect';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    StoreModule.forRoot({state: reducer}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([AppEffects, AppServiceEffect]),
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
