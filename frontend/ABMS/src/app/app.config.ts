import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { msalProviders } from './core/config/msal.config';
import { urlInterceptor } from './core/interceptors/url.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([urlInterceptor]),
      withInterceptorsFromDi(),
      withFetch()
    ),
    provideTranslateService({
      defaultLanguage: 'pl',
    }),
    msalProviders,
  ],
};
