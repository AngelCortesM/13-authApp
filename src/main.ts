import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { provideHttpClient, withFetch } from '@angular/common/http';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(moduleRef => {
    const injector = moduleRef.injector;
    const httpClient = injector.get(provideHttpClient(withFetch()));
  })
  .catch(err => console.error(err));
