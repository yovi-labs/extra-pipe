import type { PipeSelector } from '../../data/pipe-examples';
import { COLLECTIONS_ADAPTERS } from './collections-adapters';
import { DATES_ADAPTERS } from './dates-adapters';
import { DISPLAY_ADAPTERS } from './display-adapters';
import type { PipeAdapter } from './json-contracts';
import { METRICS_ADAPTERS } from './metrics-adapters';
import { NUMBERS_ADAPTERS } from './numbers-adapters';
import { OBJECTS_ADAPTERS } from './objects-adapters';
import { TEXT_ADAPTERS } from './text-adapters';

/** Compile-time exhaustive whitelist. No prototype lookup or dynamic code generation. */
const adapters = {
  ...COLLECTIONS_ADAPTERS,
  ...DATES_ADAPTERS,
  ...DISPLAY_ADAPTERS,
  ...METRICS_ADAPTERS,
  ...NUMBERS_ADAPTERS,
  ...OBJECTS_ADAPTERS,
  ...TEXT_ADAPTERS,
} satisfies Readonly<Record<PipeSelector, PipeAdapter>>;
export const PIPE_ADAPTERS: ReadonlyMap<string, PipeAdapter> = new Map(Object.entries(adapters));
