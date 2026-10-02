import {
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
} from 'extra-pipe';
import type { JsonRecord, PipeAdapter } from './json-contracts';
import { adapt, arrayOf, nullable, number, optional, record, text } from './json-contracts';
export const METRICS_ADAPTERS = {
  sumBy: adapt(
    sumBy<JsonRecord>,
    [nullable(arrayOf(record)), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  averageBy: adapt(
    averageBy<JsonRecord>,
    [nullable(arrayOf(record)), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  minBy: adapt(
    minBy<JsonRecord>,
    [nullable(arrayOf(record)), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  maxBy: adapt(
    maxBy<JsonRecord>,
    [nullable(arrayOf(record)), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  summarizeBy: adapt(
    summarizeBy<JsonRecord>,
    [nullable(arrayOf(record)), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  percentileBy: adapt(
    percentileBy<JsonRecord>,
    [nullable(arrayOf(record)), text, optional(number)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  weightedAverageBy: adapt(
    weightedAverageBy<JsonRecord>,
    [nullable(arrayOf(record)), text, text],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  extentBy: adapt(
    extentBy<JsonRecord>,
    [nullable(arrayOf(record)), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  cumulativeSum: adapt(
    cumulativeSum,
    [nullable(arrayOf(number))],
    (value, _parameters, _locale) => [value],
  ),
  movingAverage: adapt(
    movingAverage,
    [nullable(arrayOf(number)), optional(number)],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  histogram: adapt(
    histogram,
    [nullable(arrayOf(number)), optional(number)],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  percentageChange: adapt(
    percentageChange,
    [nullable(number), number],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
} satisfies Readonly<Record<string, PipeAdapter>>;
