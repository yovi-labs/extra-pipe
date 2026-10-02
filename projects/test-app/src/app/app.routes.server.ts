import { RenderMode, ServerRoute } from '@angular/ssr';
import { PIPE_DOCS } from './data/pipe-catalog';
export const serverRoutes: ServerRoute[] = [
  { path: 'recipes', renderMode: RenderMode.Prerender },
  {
    path: 'pipes/:selector',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PIPE_DOCS.map((pipe) => ({ selector: pipe.selector })),
  },
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'pipes', renderMode: RenderMode.Prerender },
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
