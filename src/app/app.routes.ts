import { Routes } from '@angular/router';
import { LayoutPageComponent } from './auth/pages/layout-page/layout-page.component';
import { LayoutPageComponent as HeroLayoutComponent } from './heroes/pages/layout-page/layout-page.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: LayoutPageComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./auth/pages/login-page/login-page.component').then(c => c.LoginPageComponent)
            },
            {
                path: 'new-account',
                loadComponent: () => import('./auth/pages/register-page/register-page.component').then(c => c.RegisterPageComponent)
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: '**',redirectTo: 'login' }
        ],
        canMatch: [ PublicGuard ],
        canActivate: [ PublicGuard ]
    },
    {
        path: 'heroes',
        component: HeroLayoutComponent,
        children: [
            {
                path: 'new-hero', loadComponent: () => import('./heroes/pages/new-page/new-page.component').then(c => c.NewPageComponent)
            },
            { path: 'search', loadComponent: () => import('./heroes/pages/search-page/search-page.component').then(c => c.SearchPageComponent) },
            { path: 'edit/:id', loadComponent: () => import('./heroes/pages/new-page/new-page.component').then(c => c.NewPageComponent) },
            { path: 'list', loadComponent: () => import('./heroes/pages/list-page/list-page.component').then(c => c.ListPageComponent) },
            { path: ':id', loadComponent: () => import('./heroes/pages/hero-page/hero-page.component').then(c => c.HeroPageComponent) },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: '**', redirectTo: 'list' }
        ],
        canActivate: [ AuthGuard ],
        canMatch: [ AuthGuard ]
    },
    { path: '404', component: Error404PageComponent },
    {
        path: '',
        redirectTo: 'heroes',
        pathMatch: 'full'
    },
    { path: '**', redirectTo: '404' }
];
