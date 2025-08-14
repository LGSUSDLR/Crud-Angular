import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AuthInterceptor } from './app/services/auth.interceptor';
import { UnauthorizedInterceptor } from './app/interceptors/401.interceptor'; // 👈 importa el nuevo interceptor

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        AuthInterceptor,         // 1️⃣ Agrega el token
        UnauthorizedInterceptor, // 2️⃣ Maneja 401 (logout y redirección)
      ])
    ),
  ]
});
