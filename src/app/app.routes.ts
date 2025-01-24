import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/base/landing/landing.base').then((b) => b.LandingBase),
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'err',
    loadComponent: () =>
      import('./layout/base/landing/landing.base').then((b) => b.LandingBase),
    loadChildren: () => import('./err/err.module').then((m) => m.ErrModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/err/404',
  },
];
