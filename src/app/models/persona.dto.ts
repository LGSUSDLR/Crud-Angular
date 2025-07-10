import { Persona } from './persona.model'
import { AuditoriaLogDto } from './persona.model'



export interface Meta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
}

export interface PaginatedPersonasResponse {
  data: Persona[]
  meta: Meta
}

export interface PersonaResponse {
  success: boolean
  message: string
  data: Persona
}

export interface PersonasListResponse {
  success: boolean
  message: string
  data: PaginatedPersonasResponse
}

export interface StatsResponse {
  success: boolean
  message: string
  data: {
    grafica1: { hombres: number; mujeres: number }
    grafica2: { adultos: number; menores: number }
    grafica3: {
      mujeres_menores: number
      mujeres_mayores: number
      hombres_mayores: number
      hombres_menores: number
    }
  }

}


export interface AuditoriasResponse {
  success: boolean
  message: string
  data: AuditoriaLogDto[]
}