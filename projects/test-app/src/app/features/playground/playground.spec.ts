import { TestBed } from '@angular/core/testing';
import { PIPE_DOCS } from '../../data/pipe-catalog';
import { Playground } from './playground';
describe('Playground', () => {
  it('changes locale, accepts null, reports invalid JSON and resets', async () => {
    const fixture = TestBed.createComponent(Playground);
    fixture.componentRef.setInput(
      'pipe',
      PIPE_DOCS.find((pipe) => pipe.selector === 'compactNumber')!,
    );
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.live-output')?.textContent).toBe('12.5K');
    const locale = element.querySelector('select')!;
    locale.value = 'fr-FR';
    locale.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    expect(element.querySelector('.live-output')?.textContent).not.toBe('12.5K');
    const input = element.querySelector<HTMLTextAreaElement>('#playground-input')!;
    input.value = '{bad';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(element.querySelector('[role=alert]')?.textContent).toContain('valid JSON');
    const buttons = Array.from(element.querySelectorAll('button'));
    buttons.find((button) => button.textContent?.includes('Reset example'))!.click();
    await fixture.whenStable();
    expect(element.querySelector('.live-output')?.textContent).toBe('12.5K');
    buttons.find((button) => button.textContent?.includes('Try null input'))!.click();
    await fixture.whenStable();
    expect(element.querySelector('.live-output')?.textContent).toBe('Empty string');
  });
  it('adds an item using a replacement array and updates rendered output', async () => {
    const fixture = TestBed.createComponent(Playground);
    fixture.componentRef.setInput(
      'pipe',
      PIPE_DOCS.find((pipe) => pipe.selector === 'removeByKey')!,
    );
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const button = Array.from(element.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('Add an item'),
    )!;
    button.click();
    await fixture.whenStable();
    expect(element.querySelector('.live-output')?.textContent).toContain('New item');
    expect(element.querySelector('.live-output')?.textContent).toContain('"id": 4');
    expect(element.textContent).toContain('items = [...items,');
  });
});
