import { freeze, snapshot } from './immutable-test-inputs';

describe('immutable input test utilities', () => {
  it('preserves nested Map, Set, dates and values JSON would discard', () => {
    expect(snapshot(new Map([['x', new Set([undefined, NaN])]]))).toEqual([['x', [undefined, NaN]]]);
    expect(snapshot(new Date('2024-01-01T00:00:00Z'))).toBe('2024-01-01T00:00:00.000Z');
    expect(snapshot(null)).toBeNull();
  });
  it('freezes cyclic data and collection contents without invoking getters', () => {
    let reads = 0;
    const cyclic: { child?: object; self?: object } = {};
    cyclic.self = cyclic;
    cyclic.child = {};
    Object.defineProperty(cyclic, 'getter', { get: () => { reads++; return {}; }, enumerable: true });
    freeze(new Map([[cyclic, new Set([cyclic.child])]]));
    expect(Object.isFrozen(cyclic)).toBeTrue();
    expect(Object.isFrozen(cyclic.child)).toBeTrue();
    expect(reads).toBe(0);
    expect(snapshot(Object.defineProperty({}, 'getter', { get: () => { reads++; return 1; }, enumerable: true }))).toEqual({});
    expect(reads).toBe(0);
  });
});
