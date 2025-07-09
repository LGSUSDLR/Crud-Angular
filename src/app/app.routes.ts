import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.DashboardComponent),
    children: [
      {
        path: 'personas',
        loadComponent: () => import('./components/personas-index/personas-index').then(m => m.PersonasIndexComponent)
      },
      {
        path: 'personas/crear',
        loadComponent: () => import('./components/personas-crear/personas-crear').then(m => m.PersonasCrearComponent)
      },
      // Aquí puedes agregar gráficas y otras rutas
      {
        path: 'graficas',
        loadComponent: () => import('./components/graficas/graficas').then(m => m.GraficasComponent)
      },
      { path: '', redirectTo: 'personas', pathMatch: 'full' }
    ]
  },
  // ruta por defecto/redirección
  { path: '', redirectTo: '/dashboard/personas', pathMatch: 'full' },
  // ruta catch-all
  { path: '**', redirectTo: '/dashboard/personas' }
];
