import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./carreras.component').then(m => m.CarrerasComponent)
    }
    // {
    //   path: ':id',
    //   loadComponent: () => import('./pages/form/form.component')
    // }
  ];