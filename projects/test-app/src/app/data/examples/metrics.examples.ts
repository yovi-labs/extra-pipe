import type { PipeExample } from '../pipe-example.model';

export const METRICS_EXAMPLES = [
  {
    selector: 'sumBy',
    className: 'SumByPipe',
    category: 'Numbers',
    description: 'Sum finite numeric fields for dashboard totals.',
    example: '{{ [{"amount":2},{"amount":4}] | sumBy: "amount" }}',
    output: '6',
    contract:
      'Sum finite numeric fields for dashboard totals. Signature: sumBy(value: readonly T[] | null | undefined, key: keyof T). Returns number | null. See the shared 101 contracts for bounds and invalid inputs. Strict finite numeric own fields; missing/non-numeric fields or overflow reject the whole input. Empty records sum to zero.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: false,
    keyValue: false,
    sample: {
      input: [
        {
          amount: 2,
        },
        {
          amount: 4,
        },
      ],
      parameters: ['amount'],
    },
    parameterNames: ['key'],
  },
  {
    selector: 'averageBy',
    className: 'AverageByPipe',
    category: 'Numbers',
    description: 'Mean numeric fields for dashboard summaries.',
    example: '{{ [{"amount":2},{"amount":4}] | averageBy: "amount" }}',
    output: '3',
    contract:
      'Mean numeric fields for dashboard summaries. Signature: averageBy(value: readonly T[] | null | undefined, key: keyof T). Returns number | null. See the shared 101 contracts for bounds and invalid inputs. Arithmetic mean of strict finite own fields. Empty input, missing fields or intermediate sum overflow return null.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: false,
    keyValue: false,
    sample: {
      input: [
        {
          amount: 2,
        },
        {
          amount: 4,
        },
      ],
      parameters: ['amount'],
    },
    parameterNames: ['key'],
  },
  {
    selector: 'minBy',
    className: 'MinByPipe',
    category: 'Numbers',
    description: 'Find the original record with the smallest numeric field.',
    example: '{{ [{"amount":2},{"amount":4}] | minBy: "amount" }}',
    output: '{"amount":2}',
    contract:
      'Find the original record with the smallest numeric field. Signature: minBy(value: readonly T[] | null | undefined, key: keyof T). Returns T | null. See the shared 101 contracts for bounds and invalid inputs. Original record with the smallest finite own numeric field; first tie wins. Empty/invalid input is null; no sorting.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [
        {
          amount: 2,
        },
        {
          amount: 4,
        },
      ],
      parameters: ['amount'],
    },
    parameterNames: ['key'],
  },
  {
    selector: 'maxBy',
    className: 'MaxByPipe',
    category: 'Numbers',
    description: 'Find the original record with the largest numeric field.',
    example: '{{ [{"amount":2},{"amount":4}] | maxBy: "amount" }}',
    output: '{"amount":4}',
    contract:
      'Find the original record with the largest numeric field. Signature: maxBy(value: readonly T[] | null | undefined, key: keyof T). Returns T | null. See the shared 101 contracts for bounds and invalid inputs. Original record with the largest finite own numeric field; first tie wins. Empty/invalid input is null; no sorting.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [
        {
          amount: 2,
        },
        {
          amount: 4,
        },
      ],
      parameters: ['amount'],
    },
    parameterNames: ['key'],
  },
  {
    selector: 'summarizeBy',
    className: 'SummarizeByPipe',
    category: 'Numbers',
    description: 'One-pass count/sum/mean/min/max summary.',
    example: '{{ [{"amount":2},{"amount":4}] | summarizeBy: "amount" }}',
    output: '{"count":2,"sum":6,"mean":3,"min":2,"max":4}',
    contract:
      'One-pass count/sum/mean/min/max summary. Signature: summarizeBy(value: readonly T[] | null | undefined, key: keyof T). Returns NumericSummary | null. See the shared 101 contracts for bounds and invalid inputs. One-pass count/sum/mean/min/max; strict finite own fields. Empty input or sum overflow is null.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [
        {
          amount: 2,
        },
        {
          amount: 4,
        },
      ],
      parameters: ['amount'],
    },
    parameterNames: ['key'],
  },
  {
    selector: 'percentileBy',
    className: 'PercentileByPipe',
    category: 'Numbers',
    description: 'Interpolated percentile for numeric dashboard samples.',
    example: '{{ [{"amount":2},{"amount":4}] | percentileBy: "amount": 50 }}',
    output: '3',
    contract:
      'Interpolated percentile for numeric dashboard samples. Signature: percentileBy(value: readonly T[] | null | undefined, key: keyof T, percentile=50). Returns number | null. See the shared 101 contracts for bounds and invalid inputs. Percent 0–100, default 50. R7 linear interpolation over a sorted copy; input is unchanged. O(n log n); empty/invalid input is null.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: false,
    keyValue: false,
    sample: {
      input: [
        {
          amount: 2,
        },
        {
          amount: 4,
        },
      ],
      parameters: ['amount', 50],
    },
    parameterNames: ['key', 'percentile'],
  },
  {
    selector: 'weightedAverageBy',
    className: 'WeightedAverageByPipe',
    category: 'Numbers',
    description: 'Weighted average with explicit nonnegative weights.',
    example:
      '{{ [{"value":2,"weight":1},{"value":4,"weight":3}] | weightedAverageBy: "value": "weight" }}',
    output: '3.5',
    contract:
      'Weighted average with explicit nonnegative weights. Signature: weightedAverageBy(value: readonly T[] | null | undefined, valueKey: keyof T, weightKey: keyof T). Returns number | null. See the shared 101 contracts for bounds and invalid inputs. Explicit finite nonnegative weights; zero weights allowed but total weight must be positive. Missing fields or arithmetic overflow are null.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: false,
    keyValue: false,
    sample: {
      input: [
        {
          value: 2,
          weight: 1,
        },
        {
          value: 4,
          weight: 3,
        },
      ],
      parameters: ['value', 'weight'],
    },
    parameterNames: ['valueKey', 'weightKey'],
  },
  {
    selector: 'extentBy',
    className: 'ExtentByPipe',
    category: 'Numbers',
    description: 'Numeric lower/upper bounds for chart domains.',
    example: '{{ [{"amount":2},{"amount":4}] | extentBy: "amount" }}',
    output: '[2,4]',
    contract:
      'Numeric lower/upper bounds for chart domains. Signature: extentBy(value: readonly T[] | null | undefined, key: keyof T). Returns [number,number] | null. See the shared 101 contracts for bounds and invalid inputs. Numeric [minimum, maximum] bounds, not source records. Strict finite own fields; empty input is null.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [
        {
          amount: 2,
        },
        {
          amount: 4,
        },
      ],
      parameters: ['amount'],
    },
    parameterNames: ['key'],
  },
  {
    selector: 'cumulativeSum',
    className: 'CumulativeSumPipe',
    category: 'Numbers',
    description: 'Running totals for chart series.',
    example: '{{ [1,2,3] | cumulativeSum }}',
    output: '[1,3,6]',
    contract:
      'Running totals for chart series. Signature: cumulativeSum(value: readonly number[] | null | undefined). Returns number[]. See the shared 101 contracts for bounds and invalid inputs. Finite numeric array, stable prefix totals. Any nonfinite value or intermediate overflow rejects the whole input.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [1, 2, 3],
      parameters: [],
    },
    parameterNames: [],
  },
  {
    selector: 'movingAverage',
    className: 'MovingAveragePipe',
    category: 'Numbers',
    description: 'Full-window averages for chart smoothing.',
    example: '{{ [1,2,3] | movingAverage: 2 }}',
    output: '[1.5,2.5]',
    contract:
      'Full-window averages for chart smoothing. Signature: movingAverage(value: readonly number[] | null | undefined, windowSize=3). Returns number[]. See the shared 101 contracts for bounds and invalid inputs. Full windows only, size 1–5,000. Linear running sum; IEEE-754 rounding applies. Invalid values or intermediate overflow reject the input.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [1, 2, 3],
      parameters: [2],
    },
    parameterNames: ['windowSize'],
  },
  {
    selector: 'histogram',
    className: 'HistogramPipe',
    category: 'Numbers',
    description: 'Bounded equal-width bins for numeric distributions.',
    example: '{{ [0,1,2,3] | histogram: 2 }}',
    output: '[{"lower":0,"upper":1.5,"count":2},{"lower":1.5,"upper":3,"count":2}]',
    contract:
      'Bounded equal-width bins for numeric distributions. Signature: histogram(value: readonly number[] | null | undefined, bins=5). Returns HistogramBin[]. See the shared 101 contracts for bounds and invalid inputs. Bins 1–256, default 5; equal-width half-open bins, final bin includes the maximum. Constant data yields one bin. Invalid/overflowing ranges return an empty list.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [0, 1, 2, 3],
      parameters: [2],
    },
    parameterNames: ['bins'],
  },
  {
    selector: 'percentageChange',
    className: 'PercentageChangePipe',
    category: 'Numbers',
    description: 'Signed percentage change from a nonzero baseline.',
    example: '{{ 120 | percentageChange: 100 }}',
    output: '20',
    contract:
      'Signed percentage change from a nonzero baseline. Signature: percentageChange(value: number | null | undefined, baseline: number). Returns number | null. See the shared 101 contracts for bounds and invalid inputs. (value − baseline) / abs(baseline) × 100; baseline must be nonzero. Negative means decrease, including negative baselines. IEEE-754, not financial advice.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: false,
    keyValue: false,
    sample: {
      input: 120,
      parameters: [100],
    },
    parameterNames: ['baseline'],
  },
] as const satisfies readonly PipeExample[];
