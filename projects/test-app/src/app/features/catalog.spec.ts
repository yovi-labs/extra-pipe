import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Catalog } from './catalog';
describe('Catalog', () => {
  it('filters aliases and categories and resets empty results', async () => {
    await TestBed.configureTestingModule({
      imports: [Catalog],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Catalog);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.catalog-card').length).toBe(34);
    const search = element.querySelector('input')!;
    search.value = 'localized';
    search.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(element.querySelectorAll('.catalog-card').length).toBe(1);
    const category = element.querySelector('select')!;
    category.value = 'Numbers';
    category.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    expect(element.textContent).toContain('No matches yet.');
    element.querySelector('button')!.click();
    await fixture.whenStable();
    expect(element.querySelectorAll('.catalog-card').length).toBe(34);
  });
});
