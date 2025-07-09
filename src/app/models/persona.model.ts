export interface Persona {
  id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  edad: number;
  genero: string;
  createdAt: string;
  updatedAt?: string;
}

// Respuesta del backend
export interface PersonaResponse {
  success: boolean;
  data: {
    data: Persona[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

// Respuesta para una sola persona
export interface SinglePersonaResponse {
  success: boolean;
  data: Persona;
  message?: string;
}