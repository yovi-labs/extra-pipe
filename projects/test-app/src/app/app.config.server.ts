import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

import { SITE_ORIGIN, SITE_INDEXABLE } from './shared/site-seo';
import { siteOrigin } from './shared/site-origin.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: SITE_ORIGIN, useValue: siteOrigin(process.env) },
    {
      provide: SITE_INDEXABLE,
      useValue:
        Boolean(siteOrigin(process.env)) &&
        (process.env['VERCEL_ENV'] === 'production' || process.env['SITE_INDEXABLE'] === 'true'),
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
