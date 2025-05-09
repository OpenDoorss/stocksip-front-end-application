import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';

export const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),

    /**
     * i18n Support
     */
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot({
        loader: {
          provide: TranslateHttpLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        }
      }
    ))
    ]
};
