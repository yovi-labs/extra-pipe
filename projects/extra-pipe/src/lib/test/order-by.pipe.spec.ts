import { orderBy, OrderByPipe } from '../core/pipes/order-by.pipe';
describe('orderBy', () => {
  const items = Object.freeze([
    Object.freeze({ id: 2, tag: 'a' }),
    Object.freeze({ id: 1, tag: 'b' }),
    Object.freeze({ id: 2, tag: 'c' }),
    Object.freeze({ id: NaN, tag: 'missing' }),
  ]);
  it('sorts stably and keeps invalid keys last in both directions', () => {
    expect(new OrderByPipe('en').transform(items, 'id')).toEqual([
      items[1],
      items[0],
      items[2],
      items[3],
    ]);
    expect(orderBy(items, 'id', 'desc')).toEqual([
      items[0],
      items[2],
      items[1],
      items[3],
    ]);
    expect(items[0].id).toBe(2);
  });
  it('uses locale collation and handles invalid input', () => {
    ['en', 'fr', 'ar'].forEach(locale => {
      const data = [{ name: 'item10' }, { name: 'item2' }];
      expect(orderBy(data, 'name', 'asc', locale)[0].name).toBe('item2');
    });
    expect(orderBy(null, 'id' as never)).toEqual([]);
    expect(orderBy(items, 'id', 'bad' as 'asc')).toEqual([]);
    expect(orderBy([null] as unknown as { id: number }[], 'id')).toEqual([]);
    expect(orderBy([{}, {}] as { id?: number }[], 'id')).toEqual([{}, {}]);
  });
});
