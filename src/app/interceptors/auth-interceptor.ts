import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

      const token = localStorage.getItem('token');
    if (token) {
      // Clonamos la petición y añadimos la cabecera
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next(req);
  };
