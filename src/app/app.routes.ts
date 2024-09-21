import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'contacts',
        loadComponent: () =>
            import('./features/contacts/contact-list/contact-list.component'),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import(
                        './features/contacts/components/contact-detail/contact-detail.component'
                    ),
            },
            {
                path: 'create',
                loadComponent: () =>
                    import(
                        './features/contacts/contact-form/contact-form.component'
                    ),
            },
            {
                path: ':id',
                loadComponent: () =>
                    import(
                        './features/contacts/components/contact-detail/contact-detail.component'
                    ),
            },
            {
                path: ':id/edit',
                loadComponent: () =>
                    import(
                        './features/contacts/contact-form/contact-form.component'
                    ),
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: '',
            },
        ],
    },
    {
        path: '**',
        redirectTo: '/contacts',
        pathMatch: 'full',
    },
];
