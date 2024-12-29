import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import {authenticationInterceptor} from './app/iam/services/authentication.interceptor';

const customProviders = [
  provideHttpClient(withInterceptors([authenticationInterceptor]))
];

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    ...customProviders
  ]
}).catch((err) => console.error(err));
