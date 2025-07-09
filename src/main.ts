import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // 👈
import { AuthInterceptor } from './app/services/auth.interceptor'; // 👈 Ajusta la ruta si es diferente

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthInterceptor]) // 👈 Aquí se registra el interceptor
    ),
  ]
});
