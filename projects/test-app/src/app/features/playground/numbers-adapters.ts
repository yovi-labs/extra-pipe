import {
  clamp,
  roundTo,
  roundToStep,
  ratio,
  pluralCategory,
  formatFraction,
  basisPoints,
  numberBase,
} from 'extra-pipe';
import type { PipeAdapter } from './expanded-adapters';
/** Whitelisted JSON boundary adapters; never compile expressions or mutate input. */
export const NUMBERS_ADAPTERS: Readonly<Record<string, PipeAdapter>> = {
  clamp: (value, parameters, _locale) =>
    clamp(value as never, parameters[0] as never, parameters[1] as never),
  roundTo: (value, parameters, _locale) => roundTo(value as never, parameters[0] as never),
  roundToStep: (value, parameters, _locale) =>
    roundToStep(value as never, parameters[0] as never, parameters[1] as never),
  ratio: (value, parameters, _locale) => ratio(value as never, parameters[0] as never),
  pluralCategory: (value, parameters, locale) =>
    pluralCategory(value as never, parameters[0] as never, locale),
  formatFraction: (value, parameters, locale) =>
    formatFraction(value as never, parameters[0] as never, locale),
  basisPoints: (value, parameters, locale) =>
    basisPoints(value as never, parameters[0] as never, locale),
  numberBase: (value, parameters, _locale) => numberBase(value as never, parameters[0] as never),
};
