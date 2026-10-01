import { Routes } from '@angular/router';
import { PIPE_ALIASES } from './data/pipe-aliases';
export const routes: Routes = [
  ...PIPE_ALIASES.map((alias) => ({
    path: 'pipes/' + alias.selector,
    redirectTo: 'pipes/' + alias.target,
    pathMatch: 'full' as const,
  })),
  {
    path: 'recipes',
    title: 'Recipes — Extra Pipe',
    loadComponent: () => import('./features/recipes').then((m) => m.Recipes),
  },
  {
    path: '',
    title: 'Extra Pipe — Standalone Angular toolbox',
    loadComponent: () => import('./features/home').then((m) => m.Home),
  },
  {
    path: 'pipes',
    title: 'Pipe catalog — Extra Pipe',
    loadComponent: () => import('./features/catalog').then((m) => m.Catalog),
  },
  {
    path: 'pipes/:selector',
    loadComponent: () => import('./features/pipe-detail').then((m) => m.PipeDetail),
  },
  {
    path: '404',
    title: 'Page not found — Extra Pipe',
    loadComponent: () => import('./features/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    title: 'Page not found — Extra Pipe',
    loadComponent: () => import('./features/not-found').then((m) => m.NotFound),
  },
];
