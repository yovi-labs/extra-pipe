import {
  sumBy,
  averageBy,
  minBy,
  maxBy,
  summarizeBy,
  percentileBy,
  weightedAverageBy,
  extentBy,
  cumulativeSum,
  movingAverage,
  histogram,
  percentageChange,
} from 'extra-pipe';
import type { PipeAdapter } from './expanded-adapters';
/** Whitelisted JSON boundary adapters; never compile expressions or mutate input. */
export const METRICS_ADAPTERS: Readonly<Record<string, PipeAdapter>> = {
  sumBy: (value, parameters, _locale) => sumBy(value as never, parameters[0] as never),
  averageBy: (value, parameters, _locale) => averageBy(value as never, parameters[0] as never),
  minBy: (value, parameters, _locale) => minBy(value as never, parameters[0] as never),
  maxBy: (value, parameters, _locale) => maxBy(value as never, parameters[0] as never),
  summarizeBy: (value, parameters, _locale) => summarizeBy(value as never, parameters[0] as never),
  percentileBy: (value, parameters, _locale) =>
    percentileBy(value as never, parameters[0] as never, parameters[1] as never),
  weightedAverageBy: (value, parameters, _locale) =>
    weightedAverageBy(value as never, parameters[0] as never, parameters[1] as never),
  extentBy: (value, parameters, _locale) => extentBy(value as never, parameters[0] as never),
  cumulativeSum: (value, _parameters, _locale) => cumulativeSum(value as never),
  movingAverage: (value, parameters, _locale) =>
    movingAverage(value as never, parameters[0] as never),
  histogram: (value, parameters, _locale) => histogram(value as never, parameters[0] as never),
  percentageChange: (value, parameters, _locale) =>
    percentageChange(value as never, parameters[0] as never),
};
