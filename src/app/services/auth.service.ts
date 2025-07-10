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
import { catchError, tap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router)
  private baseUrl = environment.apiUrl

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
  localStorage.removeItem('token'); // 👈 esto sí
  this.router.navigate(['/login']);
  }


  getMe(): Observable<{ data: { user: User } } | null> {
    return this.http.get<{ data: { user: User } }>(`${this.baseUrl}/me`).pipe(
      catchError(() => of(null))
    )
  }


  isAuthenticated(): boolean {
    // Si usas token en localStorage
    return !!localStorage.getItem('token');
  }


}


