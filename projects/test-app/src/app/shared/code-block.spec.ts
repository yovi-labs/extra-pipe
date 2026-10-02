import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CodeBlock } from './code-block';
describe('CodeBlock', () => {
  let clipboardDescriptor: PropertyDescriptor | undefined;
  beforeEach(() => {
    clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
  });
  afterEach(() => {
    if (clipboardDescriptor) Object.defineProperty(navigator, 'clipboard', clipboardDescriptor);
    else Reflect.deleteProperty(navigator, 'clipboard');
  });
  function mockClipboard(value: unknown): void {
    Object.defineProperty(navigator, 'clipboard', { value, configurable: true });
  }
  async function renderCodeBlock(code = 'hello') {
    const fixture = TestBed.createComponent(CodeBlock);
    fixture.componentRef.setInput('code', code);
    await fixture.whenStable();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }
  it('supports a compact install bar without losing its accessible copy label', async () => {
    const fixture = TestBed.createComponent(CodeBlock);
    fixture.componentRef.setInput('code', 'npm install extra-pipe');
    fixture.componentRef.setInput('label', 'Install');
    fixture.componentRef.setInput('compact', true);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.classList.contains('compact')).toBe(true);
    expect(element.querySelector('code')?.textContent).toBe('npm install extra-pipe');
    expect(element.querySelector('button')?.getAttribute('aria-label')).toBe('Copy Install');
    expect(element.querySelector('[role=status]')).not.toBeNull();
    expect(element.querySelector('button svg')?.getAttribute('aria-hidden')).toBe('true');
    expect(element.querySelector('button svg')?.getAttribute('focusable')).toBe('false');
    expect(element.querySelector('button rect')).not.toBeNull();
  });
  it('copies plain text safely and announces success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard({ writeText });
    const { fixture, element } = await renderCodeBlock('<script>not executed</script>');
    expect(element.querySelector('script')).toBeNull();
    element.querySelector('button')!.click();
    await fixture.whenStable();
    expect(writeText).toHaveBeenCalledWith('<script>not executed</script>');
    expect(element.querySelector('[role=status]')?.textContent?.trim()).toBe('Code copied.');
    expect(element.querySelector('button')?.textContent?.trim()).toBe('Copied');
    expect(element.querySelector('button rect')).toBeNull();
    expect(element.querySelector('button path')?.getAttribute('d')).toBe('m5 12 4 4L19 6');
  });
  it('announces unavailable clipboard without throwing', async () => {
    mockClipboard(undefined);
    const { fixture, element } = await renderCodeBlock();
    element.querySelector('button')!.click();
    await fixture.whenStable();
    expect(element.textContent).toContain('Copy unavailable.');
  });
  it('exposes compact copy failures visually and clears them for new code', async () => {
    mockClipboard(undefined);
    const { fixture, element } = await renderCodeBlock();
    fixture.componentRef.setInput('compact', true);
    await fixture.whenStable();
    element.querySelector('button')!.click();
    await fixture.whenStable();
    expect(element.querySelector('.copy-error[role=status]')?.textContent).toContain(
      'Copy unavailable.',
    );
    fixture.componentRef.setInput('code', 'new code');
    await fixture.whenStable();
    expect(element.querySelector('.copy-error')).toBeNull();
    expect(element.querySelector('[role=status]')?.textContent?.trim()).toBe('');
  });
  it('resets copy feedback when the displayed code changes', async () => {
    mockClipboard({ writeText: vi.fn().mockResolvedValue(undefined) });
    const { fixture, element } = await renderCodeBlock();
    element.querySelector('button')!.click();
    await fixture.whenStable();
    expect(element.querySelector('button')?.textContent?.trim()).toBe('Copied');
    fixture.componentRef.setInput('code', 'changed code');
    await fixture.whenStable();
    expect(element.querySelector('button')?.textContent?.trim()).toBe('Copy code');
    expect(element.querySelector('[role=status]')?.textContent?.trim()).toBe('');
    expect(element.querySelector('button rect')).not.toBeNull();
  });
  it.each([true, false])('ignores stale clipboard completion (success: %s)', async (success) => {
    let finish!: () => void;
    const writeText = vi.fn().mockReturnValue(
      new Promise<void>((resolve, reject) => {
        finish = success ? resolve : () => reject(new Error('Copy denied'));
      }),
    );
    mockClipboard({ writeText });
    const { fixture, element } = await renderCodeBlock('old code');
    element.querySelector('button')!.click();
    fixture.componentRef.setInput('code', 'new code');
    await fixture.whenStable();
    finish();
    await Promise.resolve();
    await fixture.whenStable();
    expect(writeText).toHaveBeenCalledWith('old code');
    expect(element.querySelector('code')?.textContent).toBe('new code');
    expect(element.querySelector('button')?.textContent?.trim()).toBe('Copy code');
    expect(element.querySelector('[role=status]')?.textContent?.trim()).toBe('');
  });
});
