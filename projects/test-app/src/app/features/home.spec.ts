import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Home } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let element: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });
  it('puts a single copyable install command before the headline', () => {
    const home = element.querySelector('.home')!;
    expect(home.firstElementChild?.tagName).toBe('APP-CODE-BLOCK');
    expect(home.querySelector('pre code')?.textContent).toBe('npm install extra-pipe');
    expect(home.querySelector('button')?.getAttribute('aria-label')).toBe('Copy Install');
    expect(home.querySelectorAll('pre code').length).toBe(1);
  });
  it('keeps a centered hero and three concise features with working destinations', () => {
    expect(element.querySelectorAll('section').length).toBe(1);
    expect(element.querySelectorAll('h1').length).toBe(1);
    expect(element.querySelector('section')?.getAttribute('aria-labelledby')).toBe('home-title');
    expect(element.querySelector('.hero-actions .primary')?.getAttribute('href')).toBe('/pipes');
    expect(element.querySelector('h1')?.textContent).toContain('The Angular Toolkit');
    expect(element.querySelector('h1')?.textContent).toContain('for Everyday Interfaces');
    expect(element.textContent).toContain('Angular 20–22');
    expect(element.querySelectorAll('.feature-row article').length).toBe(3);
    expect(element.querySelector('.hero-actions .secondary')?.getAttribute('href')).toBe(
      '/pipes/compactNumber',
    );
    expect(element.querySelectorAll('.feature-row a').length).toBe(3);
  });
  it('copies the install command rather than the example', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const descriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    try {
      element.querySelector<HTMLButtonElement>('button[aria-label="Copy Install"]')!.click();
      await fixture.whenStable();
      expect(writeText).toHaveBeenCalledWith('npm install extra-pipe');
      expect(writeText).toHaveBeenCalledTimes(1);
    } finally {
      if (descriptor) Object.defineProperty(navigator, 'clipboard', descriptor);
      else Reflect.deleteProperty(navigator, 'clipboard');
    }
  });
  it('keeps all hero actions as named links with decorative, non-focusable icons', () => {
    const actions = element.querySelectorAll<HTMLAnchorElement>('.hero-actions .button');
    expect(actions.length).toBe(3);
    expect(actions[0].classList.contains('primary')).toBe(true);
    expect(actions[1].classList.contains('secondary')).toBe(true);
    expect(actions[2].classList.contains('ghost')).toBe(true);
    for (const action of actions) {
      expect(action.getAttribute('href')).toBeTruthy();
      expect(action.textContent?.trim().length).toBeGreaterThan(0);
      expect(action.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
      expect(action.querySelector('svg')?.getAttribute('focusable')).toBe('false');
    }
  });
  it('does not show preview, publication or repeated marketing sections', () => {
    expect(element.textContent).not.toMatch(/preview|published|publishing|exploring the 2\.0/i);
    expect(element.querySelector('.feature-grid')).toBeNull();
    expect(element.querySelector('.install-panel')).toBeNull();
    expect(element.querySelector('.release-note')).toBeNull();
    expect(element.querySelector('.hero-highlight')).not.toBeNull();
    expect(element.textContent).not.toContain('100+');
  });
  it('retains Extra Pipe identity without copying third-party endorsements', () => {
    expect(element.querySelector('.source-link')?.getAttribute('href')).toBe(
      'https://github.com/yovi-labs/extra-pipe',
    );
    expect(element.textContent).not.toMatch(/Vue|Appwrite|Sponsor/i);
    expect(element.querySelector('.home-example')).toBeNull();
  });
});
