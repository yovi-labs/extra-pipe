import { containsValue, excludeByValues, retainLastByKey } from './selection';

describe('collection selection', () => {
  it('preserves SameValueZero semantics for exclusions and membership', () => {
    expect(containsValue([NaN, false, 0], NaN)).toBeTrue();
    expect(containsValue(undefined, 0)).toBeFalse();
    expect(excludeByValues(Object.freeze([{ id: NaN }, { id: 1 }]), 'id', Object.freeze([NaN]))).toEqual([{ id: 1 }]);
    expect(excludeByValues<{ id: number }>([], 'id', [])).toEqual([]);
  });
  it('keeps last duplicate values in first-key insertion order', () => {
    const first = { id: 1, name: 'first' }, second = { id: 2 }, last = { id: 1, name: 'last' };
    expect(retainLastByKey(Object.freeze([first, second, last]), 'id')).toEqual([last, second]);
    expect(retainLastByKey<{ id: number }>([], 'id')).toEqual([]);
  });
  it('never invokes accessors or reads inherited keys', () => {
    let reads = 0;
    const accessor = { get id(): number { reads++; return 1; } };
    const inherited = Object.create({ id: 1 }) as { id: number };
    expect(excludeByValues([accessor, inherited], 'id', [1])).toEqual([accessor, inherited]);
    expect(retainLastByKey([accessor, inherited], 'id')).toEqual([inherited]);
    expect(reads).toBe(0);
  });
});
