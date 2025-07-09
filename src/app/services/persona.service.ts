import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

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

  getPersonas(page = 1, limit = 10) {
    return this.http.get<{ success: boolean; data: { data: Persona[], meta: any } }>(
      `${this.api}?page=${page}&limit=${limit}`
    );
  }

  getPersona(id: string) {
    return this.http.get<{ success: boolean; data: Persona }>(
      `${this.api}/${id}`
    );
  }

  crearPersona(data: PersonaPayload) {
    return this.http.post<{ success: boolean; data: Persona }>(
      this.api, data
    );
  }

  actualizarPersona(id: string, data: Partial<PersonaPayload>) {
    return this.http.put<{ success: boolean; data: Persona }>(
      `${this.api}/${id}`, data
    );
  }

  eliminarPersona(id: string) {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.api}/${id}`
    );
  }
}
