import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { Observable } from 'rxjs'

import {
  PersonasListResponse,
  PersonaResponse,
  StatsResponse,
  AuditoriasResponse, // 👈 asegúrate de tenerlo en persona.dto.ts
} from '../models/persona.dto'
import { Persona } from '../models/persona.model'

@Injectable({ providedIn: 'root' })
export class PersonasService {
  private http = inject(HttpClient)
  private baseUrl = `${environment.apiUrl}/personas`

  getAll(page = 1, limit = 10): Observable<PersonasListResponse> {
    return this.http.get<PersonasListResponse>(`${this.baseUrl}?page=${page}&limit=${limit}`)
  }

  getById(id: string): Observable<PersonaResponse> {
    return this.http.get<PersonaResponse>(`${this.baseUrl}/${id}`)
  }

  create(data: Omit<Persona, 'id' | 'createdAt'>): Observable<PersonaResponse> {
    return this.http.post<PersonaResponse>(this.baseUrl, data)
  }

  update(id: string, data: Partial<Omit<Persona, 'id' | 'createdAt'>>): Observable<PersonaResponse> {
    return this.http.put<PersonaResponse>(`${this.baseUrl}/${id}`, data)
  }

  delete(id: string): Observable<PersonaResponse> {
    return this.http.delete<PersonaResponse>(`${this.baseUrl}/${id}`)
  }

  getStats(): Observable<StatsResponse> {
    return this.http.get<StatsResponse>(`${environment.apiUrl}/personas-stats`)
  }

  getAuditorias(): Observable<AuditoriasResponse> {
    return this.http.get<AuditoriasResponse>(`${this.baseUrl}/auditorias`)
  }
}
