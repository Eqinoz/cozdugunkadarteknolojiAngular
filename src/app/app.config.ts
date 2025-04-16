import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideToastr} from 'ngx-toastr';
import {authInterceptor} from './interceptors/auth.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(),provideToastr({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      progressBar: true,
    }),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),//Angular 17 ve üstü interceptor ekleme
  ]
};
