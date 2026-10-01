import {
  AverageByPipe,
  CumulativeSumPipe,
  ExtentByPipe,
  HistogramPipe,
  MaxByPipe,
  MinByPipe,
  MovingAveragePipe,
  PercentageChangePipe,
  PercentileByPipe,
  SumByPipe,
  SummarizeByPipe,
  WeightedAverageByPipe,
  averageBy,
  cumulativeSum,
  extentBy,
  histogram,
  maxBy,
  minBy,
  movingAverage,
  percentageChange,
  percentileBy,
  sumBy,
  summarizeBy,
  weightedAverageBy,
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
describe('metrics toolbox exports', () => {
  describe('sumBy', () => {
    const invoke = sumBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const expected = 6;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new SumByPipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...['amount']))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('averageBy', () => {
    const invoke = averageBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const expected = 3;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new AverageByPipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...['amount']))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('minBy', () => {
    const invoke = minBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const expected = { amount: 2 };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new MinByPipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...['amount']))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('maxBy', () => {
    const invoke = maxBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const expected = { amount: 4 };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new MaxByPipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...['amount']))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('summarizeBy', () => {
    const invoke = summarizeBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const expected = { count: 2, sum: 6, mean: 3, min: 2, max: 4 };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new SummarizeByPipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...['amount']))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('percentileBy', () => {
    const invoke = percentileBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount', 50];
      const expected = 3;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new PercentileByPipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...['amount', 50]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount', 50];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('weightedAverageBy', () => {
    const invoke = weightedAverageBy as unknown as (
      ...args: unknown[]
    ) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [
        { value: 2, weight: 1 },
        { value: 4, weight: 3 },
      ];
      const args: unknown[] = ['value', 'weight'];
      const expected = 3.5;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new WeightedAverageByPipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...['value', 'weight']))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [
        { value: 2, weight: 1 },
        { value: 4, weight: 3 },
      ];
      const args: unknown[] = ['value', 'weight'];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('extentBy', () => {
    const invoke = extentBy as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const expected = [2, 4];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new ExtentByPipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...['amount']))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [{ amount: 2 }, { amount: 4 }];
      const args: unknown[] = ['amount'];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('cumulativeSum', () => {
    const invoke = cumulativeSum as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [1, 2, 3];
      const args: unknown[] = [];
      const expected = [1, 3, 6];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new CumulativeSumPipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [1, 2, 3];
      const args: unknown[] = [];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('movingAverage', () => {
    const invoke = movingAverage as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [1, 2, 3];
      const args: unknown[] = [2];
      const expected = [1.5, 2.5];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new MovingAveragePipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...[2]))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [1, 2, 3];
      const args: unknown[] = [2];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('histogram', () => {
    const invoke = histogram as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = [0, 1, 2, 3];
      const args: unknown[] = [2];
      const expected = [
        { lower: 0, upper: 1.5, count: 2 },
        { lower: 1.5, upper: 3, count: 2 },
      ];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new HistogramPipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...[2]))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = [0, 1, 2, 3];
      const args: unknown[] = [2];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('percentageChange', () => {
    const invoke = percentageChange as unknown as (
      ...args: unknown[]
    ) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 120;
      const args: unknown[] = [100];
      const expected = 20;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new PercentageChangePipe();
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
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...[100]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 120;
      const args: unknown[] = [100];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
});
describe('metrics boundaries', () => {
  it('rejects missing, coercible, inherited and nonfinite fields', () => {
    expect(sumBy([{ n: '2' }], 'n')).toBeNull();
    expect(averageBy([{ n: Infinity }], 'n')).toBeNull();
    expect(minBy([], 'x' as never)).toBeNull();
    expect(maxBy(null, 'x' as never)).toBeNull();
    expect(sumBy([], 'x' as never)).toBe(0);
    expect(sumBy([{ n: 1 }], null as never)).toBeNull();
  });
  it('keeps first extrema ties and bounds percentile interpolation', () => {
    const a = { n: 2 },
      b = { n: 2 };
    expect(minBy([a, b], 'n')).toBe(a);
    expect(maxBy([a, b], 'n')).toBe(a);
    expect(percentileBy([a, b], 'n', 0)).toBe(2);
    expect(percentileBy([a, { n: 6 }], 'n', 25)).toBe(3);
    expect(percentileBy([a], 'n', 100)).toBe(2);
    expect(percentileBy([a], 'n', 101)).toBeNull();
    expect(percentileBy([], 'n' as never)).toBeNull();
    expect(percentileBy([a], 'n', NaN)).toBeNull();
    expect(extentBy([], 'n' as never)).toBeNull();
  });
  it('rejects weights and overflow without partial results', () => {
    expect(weightedAverageBy([{ v: 1, w: -1 }], 'v', 'w')).toBeNull();
    expect(weightedAverageBy([{ v: 1, w: 0 }], 'v', 'w')).toBeNull();
    expect(weightedAverageBy([{ v: 1 }], 'v', 'w' as never)).toBeNull();
    expect(weightedAverageBy([{ v: 1e308, w: 1e308 }], 'v', 'w')).toBeNull();
    expect(sumBy([{ v: 1e308 }, { v: 1e308 }], 'v')).toBeNull();
    expect(summarizeBy([{ v: 1e308 }, { v: 1e308 }], 'v')).toBeNull();
    expect(averageBy([{ v: 1e308 }, { v: 1e308 }], 'v')).toBeNull();
    expect(summarizeBy([], 'v' as never)).toBeNull();
  });
  it('smooths only full windows with bounded sizes', () => {
    expect(movingAverage([1, 2], 3)).toEqual([]);
    expect(movingAverage([1, 2], 0)).toEqual([]);
    expect(movingAverage([1, 2], 1)).toEqual([1, 2]);
    expect(movingAverage([1, 2, 3, 4], 2)).toEqual([1.5, 2.5, 3.5]);
    expect(movingAverage([1e308, 1e308], 2)).toEqual([]);
    expect(cumulativeSum([1e308, 1e308])).toEqual([]);
    expect(cumulativeSum([])).toEqual([]);
  });
  it('buckets negative values, maximum endpoints and constants', () => {
    expect(histogram([2, 2])).toEqual([{ lower: 2, upper: 2, count: 2 }]);
    expect(histogram([])).toEqual([]);
    expect(histogram([1], 257)).toEqual([]);
    expect(histogram([-1e308, 1e308])).toEqual([]);
    expect(histogram([-2, 0, 2], 2).map(bin => bin.count)).toEqual([1, 2]);
    expect(histogram([Number.MIN_VALUE, 2 * Number.MIN_VALUE], 256)).toEqual(
      []
    );
  });
  it('uses magnitude for negative baselines and rejects zero', () => {
    expect(percentageChange(-50, -100)).toBe(50);
    expect(percentageChange(1, 0)).toBeNull();
    expect(percentageChange(1, NaN)).toBeNull();
    expect(percentageChange(1e308, -1e308)).toBeNull();
  });
});
