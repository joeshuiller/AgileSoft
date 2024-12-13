import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routing';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { pagesReducers } from './store/pagesReducers';
import { EffectsArray } from './store/effects/EffectsArray';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InterceptorService } from './service/interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideRouter(
      routes,
      withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
    ), 
    provideStore(pagesReducers), 
    provideEffects(EffectsArray), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
};
