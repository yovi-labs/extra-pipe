import { evaluateInput, runPipe, SAMPLES } from './pipe-runner';
import { PIPE_DOCS } from '../../data/pipe-catalog';
describe('playground adapters', () => {
  it('runs every canonical selector against its example', () => {
    PIPE_DOCS.forEach((pipe) => {
      const sample = SAMPLES[pipe.selector]!;
      expect(sample).toBeDefined();
      const result = evaluateInput(
        pipe.selector,
        JSON.stringify(sample.input),
        JSON.stringify(sample.parameters),
        'en-US',
      );
      expect(result.error).toBe('');
      expect(result.output.length).toBeGreaterThan(0);
    });
  });
  it('formats actual locales, refreshes relative time and rejects malformed data', () => {
    const initial = evaluateInput(
      'relativeTime',
      '"2024-01-01T12:03:00Z"',
      '["2024-01-01T12:00:00Z"]',
      'en',
    );
    const refreshed = evaluateInput(
      'relativeTime',
      '"2024-01-01T12:03:00Z"',
      '["2024-01-01T12:04:00Z"]',
      'en',
    );
    expect(initial.output).toBe('in 3 minutes');
    expect(refreshed.output).toBe('1 minute ago');
    expect(evaluateInput('compactNumber', '12500', '["compact",1]', 'fr').output).not.toBe('12.5K');
    expect(evaluateInput('compactNumber', '{bad', '[]', 'en').error).toContain('valid JSON');
    expect(evaluateInput('compactNumber', '1', '{}', 'en').error).toContain('JSON array');
    expect(evaluateInput('truncateMiddle', 'null', '[12]', 'en').output).toBe('');
    expect(evaluateInput('groupBy', 'null', '["id"]', 'en').output).toBe('[]');
  });
  it('never executes entered code and bounds costly inputs', () => {
    expect(evaluateInput('slugify', '"<script>alert(1)</script>"', '[]', 'en').output).toBe(
      'script-alert-1-script',
    );
    expect(
      evaluateInput('hide', '"text"', JSON.stringify([true, 'a'.repeat(129)]), 'en').error,
    ).toContain('128');
    expect(
      evaluateInput(
        'groupBy',
        JSON.stringify(Array.from({ length: 501 }, () => ({ id: 1 }))),
        '["id"]',
        'en',
      ).error,
    ).toContain('500');
    expect(evaluateInput('mask', ' '.repeat(20001), '[]', 'en').error).toContain('20,000');
  });
  it('preserves frozen collection references and stable ordering', () => {
    const items = Object.freeze([
      Object.freeze({ id: 1, name: 'old' }),
      Object.freeze({ id: 2, name: 'two' }),
      Object.freeze({ id: 1, name: 'new' }),
    ]);
    expect(runPipe('uniqueBy', items, ['id', 'last'], 'en')).toEqual([items[1], items[2]]);
    expect(items[0].name).toBe('old');
  });
});
