import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./materias.component').then(m => m.MateriasComponent)
    }
    // {
    //   path: ':id',
    //   loadComponent: () => import('./pages/form/form.component')
    // }
  ];