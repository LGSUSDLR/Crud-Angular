import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';

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

  constructor(
    private personaService: PersonaService,
    private router: Router
  ) {}

  ngOnInit() {
    // Mostrar mensaje de éxito si viene de crear persona
    if (history.state && history.state.mensaje) {
      this.mensajeExito = history.state.mensaje;
      setTimeout(() => this.mensajeExito = '', 2200);
    }
    this.cargarPersonas();
    // Recargar lista si regresas a esta ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.router.url === '/dashboard/personas') {
        this.cargarPersonas();
      }
    });
  }

  cargarPersonas() {
    this.personaService.getPersonas().subscribe(res => {
      this.personas = res.data.data;
    });
  }

  editarPersona(persona: Persona) {
    // Navegar a editar si implementas esa ruta
    // this.router.navigate(['/dashboard/personas/editar', persona.id]);
  }

  eliminarPersona(persona: Persona) {
    if (confirm('¿Seguro que quieres eliminar esta persona?')) {
      this.personaService.eliminarPersona(persona.id).subscribe(() => {
        this.cargarPersonas();
      });
    }
  }
}
