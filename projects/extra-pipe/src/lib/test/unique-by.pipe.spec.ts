import { uniqueBy, UniqueByPipe } from '../core/pipes/unique-by.pipe';
describe('uniqueBy', () => {
  const items = Object.freeze([
    Object.freeze({ id: 1, name: 'old' }),
    Object.freeze({ id: 2, name: 'two' }),
    Object.freeze({ id: 1, name: 'new' }),
  ]);
  it('retains first by default and last in source order', () => {
    expect(new UniqueByPipe().transform(items, 'id')).toEqual([
      items[0],
      items[1],
    ]);
    expect(uniqueBy(items, 'id', 'last')).toEqual([items[1], items[2]]);
    expect(uniqueBy(items, 'id')[0]).toBe(items[0]);
  });
  it('handles missing keys and invalid inputs', () => {
    expect(uniqueBy(null, 'id' as never)).toEqual([]);
    expect(uniqueBy([], 'id' as never)).toEqual([]);
    expect(uniqueBy([null] as unknown as { id: number }[], 'id')).toEqual([]);
    expect(uniqueBy(items, 'id', 'bad' as 'first')).toEqual([]);
    expect(uniqueBy([{}, {}] as { id?: number }[], 'id')).toEqual([{}]);
  });
});
