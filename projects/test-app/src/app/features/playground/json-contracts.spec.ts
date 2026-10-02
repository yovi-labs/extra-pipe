import { adapt, arrayOf, number, objectOf, oneOf, optional, record, text } from './json-contracts';
import { evaluateInput } from './pipe-runner';

describe('typed JSON boundary', () => {
  it('validates every argument before execution and preserves references', () => {
    let executions = 0;
    const fn = adapt(
      (items: readonly number[], size?: number) => {
        executions++;
        expect(size).toBeUndefined();
        return items;
      },
      [arrayOf(number), optional(number)],
      (value, parameters) => [value, parameters[0]],
    );
    const items = Object.freeze([1, 2]);
    expect(fn(items, [], 'en')).toBe(items);
    expect(() => fn([1, 'two'], [], 'en')).toThrowError(/JSON contract/);
    expect(() => fn(items, ['two'], 'en')).toThrowError(/JSON contract/);
    expect(executions).toBe(1);
  });
  it('rejects getters, inherited options and mistyped option names', () => {
    let reads = 0;
    expect(
      record({
        get value() {
          reads++;
          return 1;
        },
      }),
    ).toBe(false);
    expect(reads).toBe(0);
    const guard = objectOf({ style: optional(oneOf('short', 'long')), label: optional(text) });
    expect(guard({ style: 'short' })).toBe(true);
    expect(guard({ style: 'tiny' })).toBe(false);
    expect(guard({ stlye: 'short' })).toBe(false);
    expect(guard(Object.create({ style: 'short' }))).toBe(false);
    expect(guard(JSON.parse('{"__proto__": {"polluted": true}}'))).toBe(false);
  });
  it('rejects incompatible input shapes and excess parameters with useful errors', () => {
    for (const [selector, input, parameters] of [
      ['groupBy', '[1,2]', '["id"]'],
      ['truncate', '123', '[4]'],
      ['unzip', '[[1,2,3]]', '[]'],
      ['renameKeys', '{"a":1}', '[{"a":2}]'],
      ['listFormat', '["hello"]', '[{"stlye":"short"}]'],
      ['dateParts', '"2026-01-01"', '[3]'],
    ])
      expect(evaluateInput(selector, input, parameters, 'en').error).toContain('JSON contract');
    expect(evaluateInput('mask', '"1234"', '[1,1,"*","extra"]', 'en').error).toContain(
      'Too many parameters',
    );
  });
  it('keeps prototype keys inert and never evaluates entered expressions', () => {
    expect(
      evaluateInput(
        'getPath',
        '{"__proto__":{"polluted":true}}',
        '[["__proto__","polluted"],"safe"]',
        'en',
      ).output,
    ).toBe('safe');
    expect(Object.hasOwn(Object.prototype, 'polluted')).toBe(false);
    expect(
      evaluateInput('highlightMatches', '"<script>alert(1)</script>"', '["alert"]', 'en').output,
    ).toContain('<script>');
    expect(evaluateInput('wordCount', 'globalThis.alert(1)', '[]', 'en').error).toContain(
      'valid JSON',
    );
    expect(evaluateInput('formatFraction', '0.5', '[100000000]', 'en').output).toBe('');
    expect(evaluateInput('dateSequence', '"2000-01-01"', '["2200-01-01",1]', 'en').output).toBe(
      '[]',
    );
  });
});
