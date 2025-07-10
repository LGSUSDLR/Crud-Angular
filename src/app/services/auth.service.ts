import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from '../environments/environment'
import {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
  User,
} from '../models/auth.dto'
import { Observable, of } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router)
  private baseUrl = environment.apiUrl

  // Rutas públicas
  login(data: LoginRequest): Observable<{ data: LoginResponse }> {
    return this.http
      .post<{ data: LoginResponse }>(`${this.baseUrl}/login`, data)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.data.token)
        })
      )
  }

  register(data: RegisterRequest): Observable<{ data: RegisterResponse }> {
    return this.http.post<{ data: RegisterResponse }>(
      `${this.baseUrl}/register`,
      data
    )
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  // Método opcional si quieres seguir obteniendo info de /me
  getMe(): Observable<{ data: { user: User } } | null> {
    return this.http.get<{ data: { user: User } }>(`${this.baseUrl}/me`).pipe(
      catchError(() => of(null))
    )
  }

  // Nueva propiedad apuntando a tu ruta protegida de Personas
  private protectedUrl = `${this.baseUrl}/personas`

  /**
   * Llama a GET /personas (ruta protegida)
   *  • Si responde 200 ➔ devuelve true
   *  • Si responde 401/403 u otro error ➔ devuelve false
   */
  isAuthenticated(): Observable<boolean> {
    return this.http.get(this.protectedUrl).pipe(
      map(() => true),
      catchError(() => {
        // opcional: limpiar token si ya está inválido
        localStorage.removeItem('token')
        return of(false)
      })
    )
  }
}
