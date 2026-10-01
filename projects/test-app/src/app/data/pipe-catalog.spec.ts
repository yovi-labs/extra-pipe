import { filterPipes, PIPE_ALIASES, PIPE_DOCS, standaloneCode } from './pipe-catalog';
import { routes } from '../app.routes';
describe('pipe catalog', () => {
  it('redirects compatibility documentation URLs to their canonical selector', () => {
    PIPE_ALIASES.forEach((alias) =>
      expect(routes.find((route) => route.path === 'pipes/' + alias.selector)?.redirectTo).toBe(
        'pipes/' + alias.target,
      ),
    );
  });
  it('has 101 distinct canonical pipes and all compatibility aliases', () => {
    expect(PIPE_DOCS.length).toBe(101);
    expect(new Set(PIPE_DOCS.map((item) => item.selector)).size).toBe(101);
    expect(PIPE_ALIASES.length).toBe(4);
    PIPE_ALIASES.forEach((alias) =>
      expect(PIPE_DOCS.some((pipe) => pipe.selector === alias.target)).toBe(true),
    );
  });
  it('searches names, classes, descriptions and aliases with category filters', () => {
    expect(filterPipes('  FILESIZE  ').some((pipe) => pipe.selector === 'filesize')).toBe(true);
    expect(filterPipes('locale', 'Numbers').every((pipe) => pipe.category === 'Numbers')).toBe(
      true,
    );
    expect(filterPipes('not-a-pipe')).toEqual([]);
  });
  it('includes imports and explicit contracts for every entry', () => {
    PIPE_DOCS.forEach((pipe) => {
      expect(standaloneCode(pipe)).toContain('imports: [' + pipe.className);
      expect(pipe.invalid.length).toBeGreaterThan(0);
      expect(pipe.locale.length).toBeGreaterThan(0);
    });
  });
});
