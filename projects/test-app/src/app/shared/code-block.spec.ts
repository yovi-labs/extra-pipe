import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CodeBlock } from './code-block';
describe('CodeBlock', () => {
  it('copies plain text safely and announces success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const descriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    try {
      const fixture = TestBed.createComponent(CodeBlock);
      fixture.componentRef.setInput('code', '<script>not executed</script>');
      await fixture.whenStable();
      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelector('script')).toBeNull();
      element.querySelector('button')!.click();
      await fixture.whenStable();
      expect(writeText).toHaveBeenCalledWith('<script>not executed</script>');
      expect(element.querySelector('[role=status]')?.textContent).toBe('Code copied.');
    } finally {
      if (descriptor) Object.defineProperty(navigator, 'clipboard', descriptor);
      else Reflect.deleteProperty(navigator, 'clipboard');
    }
  });
  it('announces unavailable clipboard without throwing', async () => {
    const descriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
    try {
      const fixture = TestBed.createComponent(CodeBlock);
      fixture.componentRef.setInput('code', 'hello');
      await fixture.whenStable();
      (fixture.nativeElement as HTMLElement).querySelector('button')!.click();
      await fixture.whenStable();
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Copy unavailable.');
    } finally {
      if (descriptor) Object.defineProperty(navigator, 'clipboard', descriptor);
      else Reflect.deleteProperty(navigator, 'clipboard');
    }
  });
});
