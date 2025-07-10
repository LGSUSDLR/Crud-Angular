import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasService } from '../../services/persona.service';

@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graficas.html',
  styleUrls: ['./graficas.css'],
})
export class GraficasComponent implements OnInit {
  stats = {
    grafica1: { hombres: 0, mujeres: 0 },
    grafica2: { adultos: 0, menores: 0 },
    grafica3: {
      mujeres_menores: 0,
      mujeres_mayores: 0,
      hombres_mayores: 0,
      hombres_menores: 0,
    },
  };
  loading = false;

  constructor(private personaService: PersonasService) {}

  ngOnInit() {
    this.loading = true;
    this.personaService.getStats().subscribe({
      next: (res) => {
        this.stats = res.data;
        this.loading = false;
      },
      error: () => {
        alert('Error al cargar gráficas');
        this.loading = false;
      },
    });
  }

  getBarWidth(count: number, total: number): string {
    if (!total) return '0%';
    return `${(count / total) * 100}%`;
  }
}
