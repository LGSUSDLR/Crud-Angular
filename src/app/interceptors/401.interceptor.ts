import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const UnauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Si el backend responde 401 (token inválido o expirado), cerramos sesión y redirigimos
        authService.logout();
        // Puedes retornar null o relanzar el error, depende de tu flujo
        return throwError(() => null);
      }
      // Otros errores se pasan normal
      return throwError(() => error);
    })
  );
};
