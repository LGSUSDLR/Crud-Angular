import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-personas-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './personas-index.html',
  styleUrls: ['./personas-index.css']
})
export class PersonasIndexComponent implements OnInit {
  personas: Persona[] = [];
  mensajeExito = '';
  cargando = false;
  error = '';

  constructor(
    private personaService: PersonaService,
    private router: Router
  ) {}

  ngOnInit() {
    // Mostrar mensaje de éxito si viene de crear persona
    if (history.state && history.state.mensaje) {
      this.mensajeExito = history.state.mensaje;
      setTimeout(() => {
        this.mensajeExito = '';
      }, 3000);
    }
    
    this.cargarPersonas();
  }

  cargarPersonas() {
    this.cargando = true;
    this.error = '';
    
    this.personaService.getPersonas().subscribe({
      next: (response) => {
        this.cargando = false;
        if (response.success && response.data && response.data.data) {
          this.personas = response.data.data;
          console.log('Personas cargadas:', this.personas); // Debug
        } else {
          this.error = 'No se pudieron cargar las personas';
          this.personas = [];
        }
      },
      error: (error) => {
        this.cargando = false;
        console.error('Error al cargar personas:', error);
        this.error = 'Error al cargar las personas';
        this.personas = [];
      }
    });
  }

  editarPersona(persona: Persona) {
    // Implementar navegación a editar
    console.log('Editar persona:', persona);
    // this.router.navigate(['/dashboard/personas/editar', persona.id]);
  }

  eliminarPersona(persona: Persona) {
    if (confirm(`¿Estás seguro que deseas eliminar a ${persona.nombre} ${persona.apellido_paterno}?`)) {
      this.personaService.eliminarPersona(persona.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.mensajeExito = 'Persona eliminada exitosamente';
            this.cargarPersonas();
            setTimeout(() => {
              this.mensajeExito = '';
            }, 3000);
          } else {
            this.error = 'Error al eliminar la persona';
          }
        },
        error: (error) => {
          console.error('Error al eliminar persona:', error);
          this.error = 'Error al eliminar la persona';
        }
      });
    }
  }

  // Método para limpiar mensajes
  limpiarMensajes() {
    this.mensajeExito = '';
    this.error = '';
  }
}