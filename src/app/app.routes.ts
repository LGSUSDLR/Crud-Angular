import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
  path: 'personas',
  loadComponent: () => import('./components/personas-index/personas-index').then(m => m.PersonasIndexComponent)
}

];
