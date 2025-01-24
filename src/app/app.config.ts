import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
} from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  RouterModule,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';
import { translateModuleConfig } from './translate/translateModuleConfig';
import {
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { NgEventBus } from 'ng-event-bus';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    importProvidersFrom(
      RouterModule,
      FormsModule,
      BrowserModule,
      TranslateModule.forRoot(translateModuleConfig),
      SharedModule.forRoot()
    ),
    NgEventBus,

    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {
      provide: LOCALE_ID,
      useValue: 'es-CL',
    },
  ],
};
