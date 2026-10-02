import {
  chunk,
  compact,
  countBy,
  differenceBy,
  filterBy,
  flatten,
  groupBy,
  IncludesPipe,
  indexBy,
  intersectionBy,
  mergeBy,
  orderBy,
  paginate,
  partition,
  pluck,
  RemoveByKeyPipe,
  RemoveDuplicatesByKeyPipe,
  slidingWindow,
  symmetricDifferenceBy,
  unionBy,
  uniqueBy,
  unzip,
  zip,
} from 'extra-pipe';
import type { JsonRecord, PipeAdapter } from './json-contracts';
import {
  adapt,
  arrayOf,
  nullable,
  number,
  oneOf,
  optional,
  pair,
  record,
  text,
  unknownValue,
} from './json-contracts';
const includesPipe = new IncludesPipe();
const removeByKeyPipe = new RemoveByKeyPipe();
const removeDuplicatesByKeyPipe = new RemoveDuplicatesByKeyPipe();
export const COLLECTIONS_ADAPTERS = {
  groupBy: adapt(
    groupBy<JsonRecord, string>,
    [nullable(arrayOf(record)), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  orderBy: adapt(
    orderBy<JsonRecord, string>,
    [nullable(arrayOf(record)), text, optional(oneOf('asc', 'desc')), optional(text)],
    (value, parameters, locale) => [value, parameters[0], parameters[1], locale],
  ),
  uniqueBy: adapt(
    uniqueBy<JsonRecord, string>,
    [nullable(arrayOf(record)), text, optional(oneOf('first', 'last'))],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  includes: adapt(
    includesPipe.transform.bind(includesPipe),
    [nullable(arrayOf(unknownValue)), unknownValue],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  removeByKey: adapt(
    (removeByKeyPipe.transform<JsonRecord>).bind(removeByKeyPipe),
    [arrayOf(record), text, arrayOf(unknownValue)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  removeDuplicatesByKey: adapt(
    (removeDuplicatesByKeyPipe.transform<JsonRecord>).bind(removeDuplicatesByKeyPipe),
    [arrayOf(record), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),

  chunk: adapt(
    chunk<unknown>,
    [nullable(arrayOf(unknownValue)), optional(number)],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  flatten: adapt(
    flatten,
    [nullable(arrayOf(unknownValue)), optional(number)],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  compact: adapt(
    compact<unknown>,
    [nullable(arrayOf(unknownValue))],
    (value, _parameters, _locale) => [value],
  ),
  partition: adapt(
    partition<JsonRecord, string>,
    [nullable(arrayOf(record)), text, unknownValue],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  zip: adapt(
    zip<unknown, unknown>,
    [nullable(arrayOf(unknownValue)), arrayOf(unknownValue)],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  unzip: adapt(
    unzip<unknown, unknown>,
    [nullable(arrayOf(pair))],
    (value, _parameters, _locale) => [value],
  ),
  slidingWindow: adapt(
    slidingWindow<unknown>,
    [nullable(arrayOf(unknownValue)), optional(number), optional(number)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  pluck: adapt(
    pluck<JsonRecord, string>,
    [nullable(arrayOf(record)), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  filterBy: adapt(
    filterBy<JsonRecord, string>,
    [nullable(arrayOf(record)), text, unknownValue],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  intersectionBy: adapt(
    intersectionBy<JsonRecord, JsonRecord, string>,
    [nullable(arrayOf(record)), arrayOf(record), text],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  differenceBy: adapt(
    differenceBy<JsonRecord, JsonRecord, string>,
    [nullable(arrayOf(record)), arrayOf(record), text],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  unionBy: adapt(
    unionBy<JsonRecord, JsonRecord, string>,
    [nullable(arrayOf(record)), arrayOf(record), text],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  symmetricDifferenceBy: adapt(
    symmetricDifferenceBy<JsonRecord, JsonRecord, string>,
    [nullable(arrayOf(record)), arrayOf(record), text],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  indexBy: adapt(
    indexBy<JsonRecord, string>,
    [nullable(arrayOf(record)), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  countBy: adapt(
    countBy<JsonRecord, string>,
    [nullable(arrayOf(record)), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  mergeBy: adapt(
    mergeBy<JsonRecord, JsonRecord, string>,
    [nullable(arrayOf(record)), arrayOf(record), text],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  paginate: adapt(
    paginate<unknown>,
    [nullable(arrayOf(unknownValue)), optional(number), optional(number)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
} satisfies Readonly<Record<string, PipeAdapter>>;
