import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PersonasService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-personas-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personas-index.html',
  styleUrls: ['./personas-index.css'],
})
export class PersonasIndexComponent implements OnInit {
  personas: Persona[] = [];
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  } | null = null;
  loading = false;
  error = '';

  constructor(
    private personaService: PersonasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPersonas();
  }

  loadPersonas(page: number = 1) {
    this.loading = true;
    this.personaService.getAll(page).subscribe({
      next: (res) => {
        this.personas = res.data.data;
        this.meta = res.data.meta;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar personas';
        this.loading = false;
      },
    });
  }

  nueva() {
    this.router.navigate(['/dashboard/personas/crear']);
  }

  editar(id: string) {
    this.router.navigate(['/dashboard/personas/editar', id]);
  }

  eliminar(id: string) {
    if (!confirm('¿Estás seguro de eliminar esta persona?')) return;

    this.personaService.delete(id).subscribe({
      next: () => {
        this.loadPersonas(this.meta?.currentPage || 1);
      },
      error: () => {
        alert('Error al eliminar persona');
      },
    });
  }
}