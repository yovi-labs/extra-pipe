import { groupBy, GroupByPipe } from '../core/pipes/group-by.pipe';
describe('groupBy', () => {
  it('groups frozen objects in encounter order without mutation', () => {
    const items = Object.freeze([
      Object.freeze({ team: '__proto__', id: 1 }),
      Object.freeze({ team: 'A', id: 2 }),
      Object.freeze({ team: '__proto__', id: 3 }),
    ]);
    const result = new GroupByPipe().transform(items, 'team');
    expect(result.map(group => group.key)).toEqual(['__proto__', 'A']);
    expect(result[0].items).toEqual([items[0], items[2]]);
    expect(result[0].items[0]).toBe(items[0]);
    expect(result[0].items).not.toBe(items as unknown);
  });
  it('handles invalid input, missing properties, symbols and empty input', () => {
    expect(groupBy(null, 'id' as never)).toEqual([]);
    expect(groupBy([], 'id' as never)).toEqual([]);
    expect(groupBy([null] as unknown as { id: number }[], 'id')).toEqual([]);
    const key = Symbol('key');
    expect(groupBy([{ [key]: 'ok' }], key)[0].key).toBe('ok');
    expect(groupBy([{}, {}] as { id?: number }[], 'id')).toEqual([
      { key: undefined, items: [{}, {}] },
    ]);
  });
});
