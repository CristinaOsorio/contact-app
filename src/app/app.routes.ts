import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'contacts',
        loadComponent: () => import('./features/contacts/contact-list/contact-list.component')

    },
    {
        path: '**',
        redirectTo: '/contacts',
        pathMatch: 'full'
    }
];
