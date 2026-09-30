import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
describe('App shell', () => {
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
