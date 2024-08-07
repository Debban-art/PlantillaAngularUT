import { Routes } from '@angular/router';
import { HomeComponent } from '@Component/Home';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo:'personas',
                pathMatch:'full'
            },
            {
                path:'personas',
                loadChildren: () => import('./pages/personas/personas.routes').then(m => m.routes),
                title: 'App - Dashboard'
            },
            {
                path:'alumnos',
                loadChildren: () => import('./pages/alumnos/alumnos.routes').then(m => m.routes),
                title: 'App - Dashboard'
            },
            {
                path:'profesores',
                loadChildren: () => import('./pages/profesores/profesores.routes').then(m => m.routes),
                title: 'App - Dashboard'
            },
            {
                path:'carreras',
                loadChildren: () => import('./pages/carreras/carreras.routes').then(m => m.routes),
                title: 'App - Dashboard'
            }

        ]
    },
];