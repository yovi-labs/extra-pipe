import {
  DefaultsPipe,
  GetPathPipe,
  InvertRecordPipe,
  OmitPipe,
  PathEntriesPipe,
  PickPipe,
  PruneEmptyPipe,
  RenameKeysPipe,
  defaults,
  getPath,
  invertRecord,
  omit,
  pathEntries,
  pick,
  pruneEmpty,
  renameKeys,
} from '../../public-api';
function snapshot(value: unknown): unknown {
  return value instanceof Map
    ? Array.from(value.entries())
    : JSON.parse(JSON.stringify(value));
}
function freeze(value: unknown): void {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
}
describe('objects toolbox exports', () => {
  describe('getPath', () => {
    const invoke = getPath as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = { profile: { name: 'Ana' } };
      const args: unknown[] = [['profile', 'name']];
      const expected = 'Ana';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new GetPathPipe();
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
        expect(snapshot(invoke(value, ...[['profile', 'name']]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = { profile: { name: 'Ana' } };
      const args: unknown[] = [['profile', 'name']];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('pick', () => {
    const invoke = pick as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = { id: 1, name: 'Ana' };
      const args: unknown[] = [['name']];
      const expected = { name: 'Ana' };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new PickPipe();
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
        expect(snapshot(invoke(value, ...[['name']]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = { id: 1, name: 'Ana' };
      const args: unknown[] = [['name']];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('omit', () => {
    const invoke = omit as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = { id: 1, name: 'Ana' };
      const args: unknown[] = [['id']];
      const expected = { name: 'Ana' };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new OmitPipe();
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
        expect(snapshot(invoke(value, ...[['id']]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = { id: 1, name: 'Ana' };
      const args: unknown[] = [['id']];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('renameKeys', () => {
    const invoke = renameKeys as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = { first_name: 'Ana' };
      const args: unknown[] = [{ first_name: 'name' }];
      const expected = { name: 'Ana' };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new RenameKeysPipe();
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
        expect(snapshot(invoke(value, ...[{ first_name: 'name' }]))).toEqual(
          null
        )
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = { first_name: 'Ana' };
      const args: unknown[] = [{ first_name: 'name' }];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('defaults', () => {
    const invoke = defaults as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = { name: null, active: false };
      const args: unknown[] = [{ name: 'Ana', active: true }];
      const expected = { name: 'Ana', active: false };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new DefaultsPipe();
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
          snapshot(invoke(value, ...[{ name: 'Ana', active: true }]))
        ).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = { name: null, active: false };
      const args: unknown[] = [{ name: 'Ana', active: true }];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('invertRecord', () => {
    const invoke = invertRecord as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = { a: 'x', b: 'x' };
      const args: unknown[] = [];
      const expected = { x: ['a', 'b'] };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new InvertRecordPipe();
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
        expect(snapshot(invoke(value, ...[]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = { a: 'x', b: 'x' };
      const args: unknown[] = [];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('pruneEmpty', () => {
    const invoke = pruneEmpty as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = { a: '', b: 0, c: false, d: { e: null } };
      const args: unknown[] = [];
      const expected = { b: 0, c: false };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new PruneEmptyPipe();
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
        expect(snapshot(invoke(value, ...[]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = { a: '', b: 0, c: false, d: { e: null } };
      const args: unknown[] = [];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('pathEntries', () => {
    const invoke = pathEntries as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = { profile: { name: 'Ana' } };
      const args: unknown[] = [];
      const expected = [{ path: ['profile', 'name'], value: 'Ana' }];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new PathEntriesPipe();
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
      const value = { profile: { name: 'Ana' } };
      const args: unknown[] = [];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
});

describe('object safety and recursion boundaries', () => {
  it('rejects unsafe traversal, missing paths and malformed parameters', () => {
    expect(getPath({ a: [{ name: 'Ana' }] }, ['a', 0, 'name'])).toBe('Ana');
    expect(getPath({ a: null }, ['a', 'name'], 'missing')).toBe('missing');
    expect(getPath({}, ['missing'])).toBeNull();
    expect(getPath(undefined, [], 'fallback')).toBe('fallback');
    expect(getPath({ a: 1 }, [])).toEqual({ a: 1 });
    ['__proto__', 'constructor', 'prototype'].forEach(key =>
      expect(getPath(JSON.parse('{"' + key + '":1}'), [key])).toBeNull()
    );
    expect(getPath({}, null as never)).toBeNull();
    expect(getPath({}, [null as never])).toBeNull();
    expect(getPath({}, Array(33).fill('a'))).toBeNull();
    expect(pick({ id: 1 }, [1] as never)).toBeNull();
    expect(omit({ id: 1 }, null as never)).toBeNull();
    expect(renameKeys({ a: 1, b: 2 }, { a: 'b' })).toBeNull();
    expect(renameKeys({ a: 1 }, { a: 1 } as never)).toBeNull();
    expect(renameKeys({ a: 1 }, null as never)).toBeNull();
    expect(defaults({}, null as never)).toBeNull();
    expect(invertRecord({ a: null } as never)).toBeNull();
    expect(invertRecord({ a: Infinity })).toBeNull();
  });
  it('stores hostile keys as safe data and never invokes getters', () => {
    const source = JSON.parse('{"__proto__":{"polluted":true},"id":1}');
    const copied = pick(source, ['__proto__']);
    expect(Object.getPrototypeOf(copied)).toBe(Object.prototype);
    expect(
      Object.prototype.hasOwnProperty.call(copied, '__proto__')
    ).toBeTrue();
    expect(renameKeys({ id: 1 }, { id: '__proto__' })?.['__proto__']).toBe(1);
    expect(invertRecord({ a: '__proto__' })?.['__proto__']).toEqual(['a']);
    const getter = Object.defineProperty({}, 'id', {
      enumerable: true,
      get: () => {
        throw new Error('getter invoked');
      },
    });
    expect(getPath(getter, ['id'])).toBeNull();
    expect(pruneEmpty(getter)).toEqual({});
    expect(({} as Record<string, unknown>)['polluted']).toBeUndefined();
    expect(
      defaults({ name: 'Ana', missing: undefined }, { name: 'Sam', missing: 2 })
    ).toEqual({ name: 'Ana', missing: 2 });
  });
  it('prunes empty structures but preserves falsy scalars and rejects cycles/depth', () => {
    expect(
      pruneEmpty({ a: [null, 0, false, ''], b: [], c: {}, d: new Date(0) })
    ).toEqual({ a: [0, false], d: new Date(0) });
    expect(pruneEmpty({})).toEqual({});
    const cyclic: Record<string, unknown> = {};
    cyclic['self'] = cyclic;
    expect(pruneEmpty(cyclic)).toBeNull();
    expect(pathEntries(cyclic)).toEqual([]);
    let deep: Record<string, unknown> = { leaf: 1 };
    for (let i = 0; i < 14; i++) deep = { child: deep };
    expect(pruneEmpty(deep)).toBeNull();
    expect(pathEntries(deep)).toEqual([]);
    expect(pathEntries({ items: [1, null], empty: {}, list: [] })).toEqual([
      { path: ['items', 0], value: 1 },
      { path: ['items', 1], value: null },
      { path: ['empty'], value: {} },
      { path: ['list'], value: [] },
    ]);
  });
});
