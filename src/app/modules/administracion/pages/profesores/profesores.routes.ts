import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./profesores.component').then(m => m.ProfesoresComponent)
    }
    // {
    //   path: ':id',
    //   loadComponent: () => import('./pages/form/form.component')
    // }
  ];