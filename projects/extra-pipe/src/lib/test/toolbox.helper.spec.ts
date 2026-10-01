import {
  fieldNumbers,
  finite,
  finiteResult,
  integer,
  numbers,
  ownValue,
  plainEntries,
  plainRecord,
  records,
  sameValueZero,
  validKey,
} from '../shared/helper/toolbox.helper';
describe('toolbox boundaries', () => {
  it('rejects coercion, nonfinite values and invalid integer bounds', () => {
    expect(finite('1')).toBeFalse();
    expect(finite(Infinity)).toBeFalse();
    expect(finite(0)).toBeTrue();
    expect(integer(2, 1, 3)).toBeTrue();
    expect(integer(0, 1, 3)).toBeFalse();
    expect(integer(4, 1, 3)).toBeFalse();
    expect(integer(1.5)).toBeFalse();
    expect(validKey('id')).toBeTrue();
    expect(validKey(0)).toBeTrue();
    expect(validKey(Symbol())).toBeTrue();
    expect(validKey(null)).toBeFalse();
    expect(finiteResult(Infinity)).toBeNull();
    expect(finiteResult(0)).toBe(0);
  });
  it('uses plain records and own data fields without executing getters', () => {
    const value = Object.create(null);
    value.id = 1;
    expect(plainRecord(value)).toBeTrue();
    expect(plainRecord({})).toBeTrue();
    [null, 1, [], new Date()].forEach(item =>
      expect(plainRecord(item)).toBeFalse()
    );
    const accessor = Object.defineProperty({}, 'id', {
      get: () => {
        throw new Error('getter executed');
      },
      enumerable: true,
    });
    expect(ownValue(accessor, 'id')).toBeUndefined();
    expect(ownValue(null, 'id')).toBeUndefined();
    expect(ownValue(1, 'id')).toBeUndefined();
    expect(ownValue(Object.create({ id: 1 }), 'id')).toBeUndefined();
    expect(plainEntries({ id: 1 })).toEqual([['id', 1]]);
    expect(records([{}])).toBeTrue();
    expect(records([null])).toBeFalse();
    expect(records(null)).toBeFalse();
  });
  it('validates numeric arrays/fields and SameValueZero equality', () => {
    expect(numbers([0, 2])).toBeTrue();
    expect(numbers(['2'])).toBeFalse();
    expect(numbers(null)).toBeFalse();
    expect(fieldNumbers([{ id: 1 }], 'id')).toEqual([1]);
    expect(fieldNumbers([{ id: '1' }], 'id')).toBeNull();
    expect(fieldNumbers(null, 'id' as never)).toBeNull();
    expect(fieldNumbers([], null as never)).toBeNull();
    expect(sameValueZero(NaN, NaN)).toBeTrue();
    expect(sameValueZero(0, -0)).toBeTrue();
    expect(sameValueZero('1', 1)).toBeFalse();
    expect(sameValueZero(1, 2)).toBeFalse();
  });
});
