// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';

import { AppState } from './app.service';
import { VitHttp } from './services/vithttp'
// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  VitHttp
];
