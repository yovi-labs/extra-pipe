import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { App } from './app';
describe('App shell', () => {
  it('keeps skip links on the current route and focuses content after navigation', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/pipes');
    await fixture.whenStable();
    await router.navigateByUrl('/pipes/localized');
    await fixture.whenStable();
    expect(router.url).toBe('/pipes/localizedDate');
    expect(document.activeElement?.id).toBe('main');
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('.skip-link')?.getAttribute('href'),
    ).toBe('/pipes/localizedDate#main');
  });
  it('renders labeled navigation and a keyboard skip link', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('nav')?.getAttribute('aria-label')).toBe('Main navigation');
    expect(element.querySelector('.skip-link')?.getAttribute('href')).toBe('/#main');
    expect(element.querySelector('main')?.id).toBe('main');
  });
});
