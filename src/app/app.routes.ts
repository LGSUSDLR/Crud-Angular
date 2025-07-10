import { Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],  // 👈 Aquí pones el guard
    loadComponent: () =>
      import('./components/dashboard/dashboard').then((m) => m.DashboardComponent),
    children: [
      {
        path: 'personas',
        loadComponent: () =>
          import('./components/personas-index/personas-index').then((m) => m.PersonasIndexComponent),
      },
      {
        path: 'personas/crear',
        loadComponent: () =>
          import('./components/personas-store/personas-store').then((m) => m.PersonasStoreComponent),
      },
      {
        path: 'personas/editar/:id',
        loadComponent: () =>
          import('./components/personas-store/personas-store').then((m) => m.PersonasStoreComponent),
      },
      {
        path: 'graficas',
        loadComponent: () =>
          import('./components/graficas/graficas').then((m) => m.GraficasComponent),
      },
      { path: '', redirectTo: 'personas', pathMatch: 'full' },
      {
        path: 'auditorias',
        loadComponent: () =>
          import('./components/auditorias/auditorias').then(m => m.Auditorias)
      }
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register').then((m) => m.RegisterComponent),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
]
