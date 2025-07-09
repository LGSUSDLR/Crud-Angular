import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona, PersonaResponse, SinglePersonaResponse } from '../models/persona.model';

// Payload para crear o actualizar (en snake_case)
export interface PersonaPayload {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  edad: number;
  genero: string;
}

@Injectable({ providedIn: 'root' })
export class PersonaService {
  private api = 'http://localhost:4444/personas';

  constructor(private http: HttpClient) {}

  getPersonas(page = 1, limit = 10): Observable<PersonaResponse> {
    return this.http.get<PersonaResponse>(
      `${this.api}?page=${page}&limit=${limit}`
    );
  }

  getPersona(id: string): Observable<SinglePersonaResponse> {
    return this.http.get<SinglePersonaResponse>(
      `${this.api}/${id}`
    );
  }

  crearPersona(data: PersonaPayload): Observable<SinglePersonaResponse> {
    return this.http.post<SinglePersonaResponse>(
      this.api, data
    );
  }

  actualizarPersona(id: string, data: Partial<PersonaPayload>): Observable<SinglePersonaResponse> {
    return this.http.put<SinglePersonaResponse>(
      `${this.api}/${id}`, data
    );
  }

  eliminarPersona(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.api}/${id}`
    );
  }
}