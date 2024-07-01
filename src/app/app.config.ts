import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { orderReducer, userReducer } from './store/reducers';
import { CommonModule } from '@angular/common';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {provideHttpClient} from "@angular/common/http";

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['user', 'order'], rehydrate: true })(reducer);
}

const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

export const AppSettings = {
  API_path: 'localhost:5205'
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ user: userReducer, order: orderReducer }, { metaReducers }),
    CommonModule,
    importProvidersFrom(
      BrowserAnimationsModule, // Required for toastr animations
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right', // Positioning the toast
        closeButton: true, // Adding a close button
        progressBar: true, // Adding a progress bar
        timeOut: 5000, // Setting timeout duration
        preventDuplicates: true, // Preventing duplicate toasts

      })   // ToastrModule configuration
    )
  ]
};
