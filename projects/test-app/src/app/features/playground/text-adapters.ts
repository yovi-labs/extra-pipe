import {
  wordCount,
  truncateWords,
  wrapWords,
  readingTime,
  normalizeWhitespace,
  stripDiacritics,
  excerpt,
  highlightMatches,
  humanizeIdentifier,
  escapeRegExp,
  graphemeCount,
  splitLines,
} from 'extra-pipe';
import type { PipeAdapter } from './expanded-adapters';
/** Whitelisted JSON boundary adapters; never compile expressions or mutate input. */
export const TEXT_ADAPTERS: Readonly<Record<string, PipeAdapter>> = {
  wordCount: (value, _parameters, locale) => wordCount(value as never, locale),
  truncateWords: (value, parameters, locale) =>
    truncateWords(value as never, parameters[0] as never, parameters[1] as never, locale),
  wrapWords: (value, parameters, _locale) => wrapWords(value as never, parameters[0] as never),
  readingTime: (value, parameters, locale) =>
    readingTime(value as never, parameters[0] as never, locale),
  normalizeWhitespace: (value, _parameters, _locale) => normalizeWhitespace(value as never),
  stripDiacritics: (value, _parameters, _locale) => stripDiacritics(value as never),
  excerpt: (value, parameters, _locale) =>
    excerpt(value as never, parameters[0] as never, parameters[1] as never, parameters[2] as never),
  highlightMatches: (value, parameters, _locale) =>
    highlightMatches(value as never, parameters[0] as never),
  humanizeIdentifier: (value, _parameters, _locale) => humanizeIdentifier(value as never),
  escapeRegExp: (value, _parameters, _locale) => escapeRegExp(value as never),
  graphemeCount: (value, _parameters, _locale) => graphemeCount(value as never),
  splitLines: (value, _parameters, _locale) => splitLines(value as never),
};
