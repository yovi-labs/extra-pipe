import { TestBed } from '@angular/core/testing';
import { App } from './app';
describe('App', () => {
  it('renders the packed library example and accessible entry point', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Better interfaces.');
    expect(element.querySelector('.result')?.textContent?.trim()).toBe('12.5K');
    expect(element.querySelector('.skip-link')?.getAttribute('href')).toBe('#main');
  });
});
