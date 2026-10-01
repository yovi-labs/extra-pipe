import {
  chunk,
  flatten,
  compact,
  partition,
  zip,
  unzip,
  slidingWindow,
  pluck,
  filterBy,
  intersectionBy,
  differenceBy,
  unionBy,
  symmetricDifferenceBy,
  indexBy,
  countBy,
  mergeBy,
  paginate,
} from 'extra-pipe';
import type { PipeAdapter } from './expanded-adapters';
/** Whitelisted JSON boundary adapters; never compile expressions or mutate input. */
export const COLLECTIONS_ADAPTERS: Readonly<Record<string, PipeAdapter>> = {
  chunk: (value, parameters, _locale) => chunk(value as never, parameters[0] as never),
  flatten: (value, parameters, _locale) => flatten(value as never, parameters[0] as never),
  compact: (value, _parameters, _locale) => compact(value as never),
  partition: (value, parameters, _locale) =>
    partition(value as never, parameters[0] as never, parameters[1] as never),
  zip: (value, parameters, _locale) => zip(value as never, parameters[0] as never),
  unzip: (value, _parameters, _locale) => unzip(value as never),
  slidingWindow: (value, parameters, _locale) =>
    slidingWindow(value as never, parameters[0] as never, parameters[1] as never),
  pluck: (value, parameters, _locale) => pluck(value as never, parameters[0] as never),
  filterBy: (value, parameters, _locale) =>
    filterBy(value as never, parameters[0] as never, parameters[1] as never),
  intersectionBy: (value, parameters, _locale) =>
    intersectionBy(value as never, parameters[0] as never, parameters[1] as never),
  differenceBy: (value, parameters, _locale) =>
    differenceBy(value as never, parameters[0] as never, parameters[1] as never),
  unionBy: (value, parameters, _locale) =>
    unionBy(value as never, parameters[0] as never, parameters[1] as never),
  symmetricDifferenceBy: (value, parameters, _locale) =>
    symmetricDifferenceBy(value as never, parameters[0] as never, parameters[1] as never),
  indexBy: (value, parameters, _locale) => indexBy(value as never, parameters[0] as never),
  countBy: (value, parameters, _locale) => countBy(value as never, parameters[0] as never),
  mergeBy: (value, parameters, _locale) =>
    mergeBy(value as never, parameters[0] as never, parameters[1] as never),
  paginate: (value, parameters, _locale) =>
    paginate(value as never, parameters[0] as never, parameters[1] as never),
};
