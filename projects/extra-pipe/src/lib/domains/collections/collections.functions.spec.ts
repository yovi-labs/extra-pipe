import { snapshot, freeze } from '../../testing/immutable-test-inputs';
import {
  ChunkPipe,
  CompactPipe,
  CountByPipe,
  DifferenceByPipe,
  FilterByPipe,
  FlattenPipe,
  IndexByPipe,
  IntersectionByPipe,
  MergeByPipe,
  PaginatePipe,
  PartitionPipe,
  PluckPipe,
  SlidingWindowPipe,
  SymmetricDifferenceByPipe,
  UnionByPipe,
  UnzipPipe,
  ZipPipe,
  chunk,
  compact,
  countBy,
  differenceBy,
  filterBy,
  flatten,
  indexBy,
  intersectionBy,
  mergeBy,
  paginate,
  partition,
  pluck,
  slidingWindow,
  symmetricDifferenceBy,
  unionBy,
  unzip,
  zip,
} from '../../../public-api';


describe('collections toolbox exports', () => {
  describe('chunk', () => {
    const invoke = chunk as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [1, 2, 3];
      const args: unknown[] = [2];
      const expected = [[1, 2], [3]];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new ChunkPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[2]))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [1, 2, 3];
      const args: unknown[] = [2];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('flatten', () => {
    const invoke = flatten as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [1, [2, [3]]];
      const args: unknown[] = [2];
      const expected = [1, 2, 3];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new FlattenPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[2]))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [1, [2, [3]]];
      const args: unknown[] = [2];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('compact', () => {
    const invoke = compact as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [0, null, false, ''];
      const args: unknown[] = [];
      const expected = [0, false, ''];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new CompactPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [0, null, false, ''];
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('partition', () => {
    const invoke = partition as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ active: true }, { active: false }];
      const args: unknown[] = ['active', true];
      const expected = {
        matching: [{ active: true }],
        remaining: [{ active: false }],
      };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new PartitionPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...['active', true]))).toEqual({
          matching: [],
          remaining: [],
        })
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ active: true }, { active: false }];
      const args: unknown[] = ['active', true];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('zip', () => {
    const invoke = zip as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [1, 2];
      const args: unknown[] = [['A', 'B']];
      const expected = [
        [1, 'A'],
        [2, 'B'],
      ];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new ZipPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[['A', 'B']]))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [1, 2];
      const args: unknown[] = [['A', 'B']];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('unzip', () => {
    const invoke = unzip as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [
        [1, 'A'],
        [2, 'B'],
      ];
      const args: unknown[] = [];
      const expected = [
        [1, 2],
        ['A', 'B'],
      ];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new UnzipPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual([[], []])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [
        [1, 'A'],
        [2, 'B'],
      ];
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('slidingWindow', () => {
    const invoke = slidingWindow as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [1, 2, 3];
      const args: unknown[] = [2];
      const expected = [
        [1, 2],
        [2, 3],
      ];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new SlidingWindowPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[2]))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [1, 2, 3];
      const args: unknown[] = [2];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('pluck', () => {
    const invoke = pluck as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ id: 1 }, { id: 2 }];
      const args: unknown[] = ['id'];
      const expected = [1, 2];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new PluckPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...['id']))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ id: 1 }, { id: 2 }];
      const args: unknown[] = ['id'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('filterBy', () => {
    const invoke = filterBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ active: true }, { active: false }];
      const args: unknown[] = ['active', true];
      const expected = [{ active: true }];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new FilterByPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...['active', true]))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ active: true }, { active: false }];
      const args: unknown[] = ['active', true];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('intersectionBy', () => {
    const invoke = intersectionBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ id: 1 }, { id: 2 }];
      const args: unknown[] = [[{ id: 2 }], 'id'];
      const expected = [{ id: 2 }];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new IntersectionByPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[[{ id: 2 }], 'id']))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ id: 1 }, { id: 2 }];
      const args: unknown[] = [[{ id: 2 }], 'id'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('differenceBy', () => {
    const invoke = differenceBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ id: 1 }, { id: 2 }];
      const args: unknown[] = [[{ id: 2 }], 'id'];
      const expected = [{ id: 1 }];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new DifferenceByPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[[{ id: 2 }], 'id']))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ id: 1 }, { id: 2 }];
      const args: unknown[] = [[{ id: 2 }], 'id'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('unionBy', () => {
    const invoke = unionBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ id: 1 }];
      const args: unknown[] = [[{ id: 1 }, { id: 2 }], 'id'];
      const expected = [{ id: 1 }, { id: 2 }];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new UnionByPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(
          snapshot(invoke(value, ...[[{ id: 1 }, { id: 2 }], 'id']))
        ).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ id: 1 }];
      const args: unknown[] = [[{ id: 1 }, { id: 2 }], 'id'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('symmetricDifferenceBy', () => {
    const invoke = symmetricDifferenceBy as unknown as (
      ...args: unknown[]
    ) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ id: 1 }, { id: 2 }];
      const args: unknown[] = [[{ id: 2 }, { id: 3 }], 'id'];
      const expected = [{ id: 1 }, { id: 3 }];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new SymmetricDifferenceByPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(
          snapshot(invoke(value, ...[[{ id: 2 }, { id: 3 }], 'id']))
        ).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ id: 1 }, { id: 2 }];
      const args: unknown[] = [[{ id: 2 }, { id: 3 }], 'id'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('indexBy', () => {
    const invoke = indexBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [
        { id: 1, name: 'Ana' },
        { id: 2, name: 'Sam' },
      ];
      const args: unknown[] = ['id'];
      const expected = [
        [1, { id: 1, name: 'Ana' }],
        [2, { id: 2, name: 'Sam' }],
      ];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new IndexByPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...['id']))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [
        { id: 1, name: 'Ana' },
        { id: 2, name: 'Sam' },
      ];
      const args: unknown[] = ['id'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('countBy', () => {
    const invoke = countBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ team: 'A' }, { team: 'A' }, { team: 'B' }];
      const args: unknown[] = ['team'];
      const expected = [
        { key: 'A', count: 2 },
        { key: 'B', count: 1 },
      ];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new CountByPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...['team']))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ team: 'A' }, { team: 'A' }, { team: 'B' }];
      const args: unknown[] = ['team'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('mergeBy', () => {
    const invoke = mergeBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ id: 1, name: 'Ana' }];
      const args: unknown[] = [[{ id: 1, active: true }], 'id'];
      const expected = [{ id: 1, name: 'Ana', active: true }];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new MergeByPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(
          snapshot(invoke(value, ...[[{ id: 1, active: true }], 'id']))
        ).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ id: 1, name: 'Ana' }];
      const args: unknown[] = [[{ id: 1, active: true }], 'id'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('paginate', () => {
    const invoke = paginate as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [1, 2, 3];
      const args: unknown[] = [1, 2];
      const expected = {
        items: [1, 2],
        page: 1,
        pageSize: 2,
        totalItems: 3,
        totalPages: 2,
      };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new PaginatePipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[1, 2]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [1, 2, 3];
      const args: unknown[] = [1, 2];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
});

describe('collection boundaries and own-key safety', () => {
  it('validates structural parameters and empty arrays', () => {
    expect(chunk([1], 0)).toEqual([]);
    expect(chunk([], 2)).toEqual([]);
    expect(flatten([1], -1)).toEqual([]);
    expect(flatten([1, [2]], 0)).toEqual([1, [2]]);
    const cyclic: unknown[] = [];
    cyclic.push(cyclic);
    expect(flatten(cyclic, 2)).toEqual([]);
    expect(partition([null], 'id' as never, undefined as never)).toEqual({
      matching: [],
      remaining: [],
    });
    expect(zip([1], null as never)).toEqual([]);
    expect(unzip([[1] as never])).toEqual([[], []]);
    expect(slidingWindow([1], 0)).toEqual([]);
    expect(slidingWindow([1, 2, 3], 2, 0)).toEqual([]);
    expect(slidingWindow([1, 2, 3, 4], 2, 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(pluck([{}], 'id' as never)).toEqual([undefined]);
    expect(pluck([], null as never)).toEqual([]);
    expect(filterBy([], null as never, 1 as never)).toEqual([]);
    expect(indexBy([], null as never).size).toBe(0);
    expect(countBy([], null as never)).toEqual([]);
    expect(paginate([], 1, 2)).toEqual({
      items: [],
      page: 1,
      pageSize: 2,
      totalItems: 0,
      totalPages: 0,
    });
    expect(paginate([1], 0)).toBeNull();
    expect(paginate([1], 1, 0)).toBeNull();
    expect(paginate([1], Number.MAX_SAFE_INTEGER, 5000)).toBeNull();
  });
  it('deduplicates set results with first-source identity and SameValueZero', () => {
    const a = Object.freeze({ id: NaN, label: 'first' }),
      b = Object.freeze({ id: NaN, label: 'later' }),
      c = Object.freeze({ id: 2, label: 'other' });
    expect(unionBy(Object.freeze([a, b]), Object.freeze([c]), 'id')).toEqual([
      a,
      c,
    ]);
    expect(intersectionBy([a, b], [b], 'id')).toEqual([a]);
    expect(differenceBy([a, b, c], [b], 'id')).toEqual([c]);
    expect(symmetricDifferenceBy([a, b], [b, c], 'id')).toEqual([c]);
    expect(unionBy<typeof a, typeof a, 'id'>([a], null as never, 'id')).toEqual(
      []
    );
    expect(intersectionBy([a], [], null as never)).toEqual([]);
    expect(indexBy([a, b], 'id').get(NaN)).toBe(b);
    expect(countBy([a, b], 'id')).toEqual([{ key: NaN, count: 2 }]);
  });
  it('handles prototype labels, absent keys and shallow merge precedence safely', () => {
    const unsafe = JSON.parse(
      '{"id":"__proto__","name":"Ana","__proto__":{"polluted":true}}'
    );
    expect(indexBy([unsafe], 'id').get('__proto__')).toBe(unsafe);
    expect(
      mergeBy([unsafe], [{ id: '__proto__', name: 'Sam' }], 'id')[0].name
    ).toBe('Sam');
    expect(({} as Record<string, unknown>)['polluted']).toBeUndefined();
    expect(mergeBy([{}], [{}], 'id' as never)).toEqual([]);
    expect(mergeBy([], null as never, 'id' as never)).toEqual([]);
    expect(countBy([{}], 'id' as never)).toEqual([
      { key: undefined, count: 1 },
    ]);
    expect(partition([{ id: 1 }, { id: 2 }], 'id', 1).remaining).toEqual([
      { id: 2 },
    ]);
    expect(
      new UnionByPipe().transform([{ id: 1 }], [{ id: 2 }], 'id').length
    ).toBe(2);
  });
});
