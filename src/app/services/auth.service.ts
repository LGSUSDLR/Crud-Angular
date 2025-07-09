// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user?: User;
    accessToken?: string; // OJO: nombre debe coincidir con el backend
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:4444';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      { email, password }
    ).pipe(
      map(res => {
        // Guarda el token
        if (res.success && res.data.accessToken) {
          localStorage.setItem('accessToken', res.data.accessToken);
        }
        return res;
      })
    );
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      { name, email, password }
    );
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

  me(): Observable<User | null> {
    return this.http.get<AuthResponse>(
      `${this.apiUrl}/me`
    ).pipe(
      map(res => res.success ? res.data.user ?? null : null)
    );
  }
}
