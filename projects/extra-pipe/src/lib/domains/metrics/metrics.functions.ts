import {
  fieldNumbers,
  finite,
  finiteResult,
  integer,
  numbers,
} from '../../internal/validation';
import { HistogramBin, NumericSummary } from './metrics.types';

export function sumBy<T>(
  value: readonly T[] | null | undefined,
  key: keyof T
): number | null {
  const fields = fieldNumbers(value, key);
  return fields ? finiteResult(fields.reduce((sum, n) => sum + n, 0)) : null;
}
export function averageBy<T>(
  value: readonly T[] | null | undefined,
  key: keyof T
): number | null {
  const fields = fieldNumbers(value, key);
  return fields?.length
    ? finiteResult(fields.reduce((sum, n) => sum + n, 0) / fields.length)
    : null;
}
function extreme<T>(
  value: readonly T[] | null | undefined,
  key: keyof T,
  direction: 1 | -1
): T | null {
  const fields = fieldNumbers(value, key);
  if (!fields?.length || !value) return null;
  let index = 0;
  for (let i = 1; i < fields.length; i++)
    if (direction * fields[i] > direction * fields[index]) index = i;
  return value[index];
}
export function minBy<T>(
  value: readonly T[] | null | undefined,
  key: keyof T
): T | null {
  return extreme(value, key, -1);
}
export function maxBy<T>(
  value: readonly T[] | null | undefined,
  key: keyof T
): T | null {
  return extreme(value, key, 1);
}
export function summarizeBy<T>(
  value: readonly T[] | null | undefined,
  key: keyof T
): NumericSummary | null {
  const fields = fieldNumbers(value, key);
  if (!fields?.length) return null;
  let sum = 0,
    min = fields[0],
    max = min;
  for (const n of fields) {
    sum += n;
    min = Math.min(min, n);
    max = Math.max(max, n);
  }
  return finite(sum)
    ? { count: fields.length, sum, mean: sum / fields.length, min, max }
    : null;
}
export function percentileBy<T>(
  value: readonly T[] | null | undefined,
  key: keyof T,
  percentile = 50
): number | null {
  const fields = fieldNumbers(value, key);
  if (
    !fields?.length ||
    !finite(percentile) ||
    percentile < 0 ||
    percentile > 100
  )
    return null;
  fields.sort((a, b) => a - b);
  const position = ((fields.length - 1) * percentile) / 100,
    lower = Math.floor(position),
    weight = position - lower;
  if (weight === 0) return fields[lower];
  return finiteResult(
    fields[lower] * (1 - weight) + fields[lower + 1] * weight
  );
}
export function weightedAverageBy<T>(
  value: readonly T[] | null | undefined,
  valueKey: keyof T,
  weightKey: keyof T
): number | null {
  const values = fieldNumbers(value, valueKey),
    weights = fieldNumbers(value, weightKey);
  if (!values?.length || !weights || weights.some(n => n < 0)) return null;
  let weight = 0,
    total = 0;
  for (let i = 0; i < values.length; i++) {
    weight += weights[i];
    total += values[i] * weights[i];
  }
  return finite(weight) && weight > 0 && finite(total)
    ? finiteResult(total / weight)
    : null;
}
export function extentBy<T>(
  value: readonly T[] | null | undefined,
  key: keyof T
): [number, number] | null {
  const fields = fieldNumbers(value, key);
  if (!fields?.length) return null;
  let min = fields[0],
    max = min;
  for (const n of fields) {
    min = Math.min(min, n);
    max = Math.max(max, n);
  }
  return [min, max];
}
export function cumulativeSum(
  value: readonly number[] | null | undefined
): number[] {
  if (!numbers(value)) return [];
  let sum = 0;
  const result: number[] = [];
  for (const n of value) {
    sum += n;
    if (!finite(sum)) return [];
    result.push(sum);
  }
  return result;
}
export function movingAverage(
  value: readonly number[] | null | undefined,
  windowSize = 3
): number[] {
  if (
    !numbers(value) ||
    !integer(windowSize, 1, 5000) ||
    windowSize > value.length
  )
    return [];
  const result: number[] = [];
  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    if (i >= windowSize) sum -= value[i - windowSize];
    sum += value[i];
    if (!finite(sum)) return [];
    if (i >= windowSize - 1) result.push(sum / windowSize);
  }
  return result;
}
export function histogram(
  value: readonly number[] | null | undefined,
  bins = 5
): HistogramBin[] {
  if (!numbers(value) || !value.length || !integer(bins, 1, 256)) return [];
  let min = value[0],
    max = min;
  for (const n of value) {
    min = Math.min(min, n);
    max = Math.max(max, n);
  }
  if (min === max) return [{ lower: min, upper: max, count: value.length }];
  const width = (max - min) / bins;
  if (!finite(width) || width <= 0) return [];
  const result = Array.from({ length: bins }, (_, i) => ({
    lower: min + i * width,
    upper: i === bins - 1 ? max : min + (i + 1) * width,
    count: 0,
  }));
  for (const n of value) {
    const index = Math.min(bins - 1, Math.floor((n - min) / width));
    result[index].count++;
  }
  return result;
}
/** Change relative to the magnitude of a nonzero baseline; negative means decrease. */
export function percentageChange(
  value: number | null | undefined,
  baseline: number
): number | null {
  return finite(value) && finite(baseline) && baseline !== 0
    ? finiteResult(((value - baseline) / Math.abs(baseline)) * 100)
    : null;
}
