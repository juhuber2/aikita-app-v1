import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  ...appConfig, // bestehende Konfiguration übernehmen
  providers: [
    ...(appConfig.providers || []), // bestehende Provider beibehalten
    provideHttpClient(),            // HttpClient hinzufügen
  ]
}).catch((err) => console.error(err));
