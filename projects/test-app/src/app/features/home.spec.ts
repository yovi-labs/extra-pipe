import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  it('presents the toolbox without preview-count wording and keeps publication status clear', async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const support = element.querySelector('.support-note')?.textContent;
    expect(support).toContain('100+ standalone Angular pipes');
    expect(support).toContain('Angular 20–22');
    expect(element.textContent).not.toContain('101 in this preview');
    expect(element.querySelector('.release-note')?.textContent).toContain(
      'not yet published on npm',
    );
    expect(element.querySelector('.hero-result')?.textContent?.trim()).toBe('12.5K');
    expect(element.querySelector('.hero-highlight')?.textContent).toBe('Better interfaces.');
  });
});
