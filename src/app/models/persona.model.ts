export interface Persona {
  id: string;
  nombre: string;
  apellidoPaterno: string; // ⬅️ cambia aquí
  apellidoMaterno: string; // ⬅️ cambia aquí
  edad: number;
  genero: 'masculino' | 'femenino';
  createdAt: string;
}


export interface AuditoriaLogDto {
  accion: string
  entidad: string
  personaId: string
  usuario: string | null
  usuarioId?: string | null
  fecha: string
  datos: any
}
