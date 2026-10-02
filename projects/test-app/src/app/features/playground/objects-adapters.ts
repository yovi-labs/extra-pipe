import {
  defaults,
  getPath,
  invertRecord,
  omit,
  pathEntries,
  pick,
  pruneEmpty,
  renameKeys,
} from 'extra-pipe';
import type { JsonRecord, PipeAdapter } from './json-contracts';
import {
  adapt,
  arrayOf,
  key,
  nullable,
  optional,
  record,
  recordOf,
  scalar,
  text,
  unknownValue,
} from './json-contracts';
export const OBJECTS_ADAPTERS = {
  getPath: adapt(
    getPath,
    [unknownValue, arrayOf(key), optional(unknownValue)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  pick: adapt(pick<JsonRecord>, [nullable(record), arrayOf(text)], (value, parameters, _locale) => [
    value,
    parameters[0],
  ]),
  omit: adapt(omit<JsonRecord>, [nullable(record), arrayOf(text)], (value, parameters, _locale) => [
    value,
    parameters[0],
  ]),
  renameKeys: adapt(
    renameKeys,
    [nullable(record), recordOf(text)],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  defaults: adapt(
    defaults<JsonRecord, JsonRecord>,
    [nullable(record), record],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  invertRecord: adapt(invertRecord, [nullable(recordOf(scalar))], (value, _parameters, _locale) => [
    value,
  ]),
  pruneEmpty: adapt(pruneEmpty, [nullable(record)], (value, _parameters, _locale) => [value]),
  pathEntries: adapt(pathEntries, [nullable(record)], (value, _parameters, _locale) => [value]),
} satisfies Readonly<Record<string, PipeAdapter>>;
