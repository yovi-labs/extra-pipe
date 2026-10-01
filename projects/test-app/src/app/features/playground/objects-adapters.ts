import {
  getPath,
  pick,
  omit,
  renameKeys,
  defaults,
  invertRecord,
  pruneEmpty,
  pathEntries,
} from 'extra-pipe';
import type { PipeAdapter } from './expanded-adapters';
/** Whitelisted JSON boundary adapters; never compile expressions or mutate input. */
export const OBJECTS_ADAPTERS: Readonly<Record<string, PipeAdapter>> = {
  getPath: (value, parameters, _locale) =>
    getPath(value as never, parameters[0] as never, parameters[1] as never),
  pick: (value, parameters, _locale) => pick(value as never, parameters[0] as never),
  omit: (value, parameters, _locale) => omit(value as never, parameters[0] as never),
  renameKeys: (value, parameters, _locale) => renameKeys(value as never, parameters[0] as never),
  defaults: (value, parameters, _locale) => defaults(value as never, parameters[0] as never),
  invertRecord: (value, _parameters, _locale) => invertRecord(value as never),
  pruneEmpty: (value, _parameters, _locale) => pruneEmpty(value as never),
  pathEntries: (value, _parameters, _locale) => pathEntries(value as never),
};
