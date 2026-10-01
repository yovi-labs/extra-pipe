import { TEXT_ADAPTERS } from './text-adapters';
import { COLLECTIONS_ADAPTERS } from './collections-adapters';
import { OBJECTS_ADAPTERS } from './objects-adapters';
import { METRICS_ADAPTERS } from './metrics-adapters';
import { NUMBERS_ADAPTERS } from './numbers-adapters';
import { DATES_ADAPTERS } from './dates-adapters';
export type PipeAdapter = (
  value: unknown,
  parameters: readonly unknown[],
  locale: string,
) => unknown;
export const EXPANDED_ADAPTERS: ReadonlyMap<string, PipeAdapter> = new Map(
  Object.entries({
    ...TEXT_ADAPTERS,
    ...COLLECTIONS_ADAPTERS,
    ...OBJECTS_ADAPTERS,
    ...METRICS_ADAPTERS,
    ...NUMBERS_ADAPTERS,
    ...DATES_ADAPTERS,
  }),
);
