import {
  CamelCaseToTitleSeparatedCasePipe,
  CamelToSnakePipe,
  CapitalizePipe,
  escapeRegExp,
  excerpt,
  graphemeCount,
  HidePipe,
  highlightMatches,
  humanizeIdentifier,
  InitialsPipe,
  MaskPipe,
  normalizeWhitespace,
  readingTime,
  slugify,
  SnakeToCamelPipe,
  splitLines,
  stripDiacritics,
  truncateMiddle,
  TruncatePipe,
  truncateWords,
  UnderscoreToTitlePipe,
  UpperCaseFromPipe,
  wordCount,
  wrapWords,
} from 'extra-pipe';
import type { PipeAdapter } from './json-contracts';
import {
  adapt,
  boolean,
  nullable,
  number,
  optional,
  slugifyOptions,
  text,
  unknownValue,
} from './json-contracts';
const truncatePipe = new TruncatePipe();
const initialsPipe = new InitialsPipe();
const maskPipe = new MaskPipe();
const camelToSnakePipe = new CamelToSnakePipe();
const camelCaseToTitleSeparatedCasePipe = new CamelCaseToTitleSeparatedCasePipe();
const capitalizePipe = new CapitalizePipe();
const hidePipe = new HidePipe();
const snakeToCamelPipe = new SnakeToCamelPipe();
const underscoreToTitlePipe = new UnderscoreToTitlePipe();
const upperCaseFromPipe = new UpperCaseFromPipe();
export const TEXT_ADAPTERS = {
  truncateMiddle: adapt(
    truncateMiddle,
    [nullable(text), number, optional(text)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  slugify: adapt(slugify, [nullable(text), slugifyOptions], (value, parameters, _locale) => [
    value,
    parameters[0],
  ]),
  truncate: adapt(
    truncatePipe.transform.bind(truncatePipe),
    [nullable(text), number, optional(text)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  initials: adapt(
    initialsPipe.transform.bind(initialsPipe),
    [nullable(text), optional(number), optional(text)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  mask: adapt(
    maskPipe.transform.bind(maskPipe),
    [nullable(text), optional(number), optional(number), optional(text)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1], parameters[2]],
  ),
  camelToSnake: adapt(
    camelToSnakePipe.transform.bind(camelToSnakePipe),
    [text],
    (value, _parameters, _locale) => [value],
  ),
  camelCaseToTitleSeparatedCase: adapt(
    camelCaseToTitleSeparatedCasePipe.transform.bind(camelCaseToTitleSeparatedCasePipe),
    [unknownValue],
    (value, _parameters, _locale) => [value],
  ),
  capitalize: adapt(
    capitalizePipe.transform.bind(capitalizePipe),
    [nullable(text)],
    (value, _parameters, _locale) => [value],
  ),
  hide: adapt(
    hidePipe.transform.bind(hidePipe),
    [nullable(text), optional(boolean), optional(text)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  snakeToCamel: adapt(
    snakeToCamelPipe.transform.bind(snakeToCamelPipe),
    [nullable(text)],
    (value, _parameters, _locale) => [value],
  ),
  underscoreToTitle: adapt(
    underscoreToTitlePipe.transform.bind(underscoreToTitlePipe),
    [nullable(text)],
    (value, _parameters, _locale) => [value],
  ),
  upperCaseFrom: adapt(
    upperCaseFromPipe.transform.bind(upperCaseFromPipe),
    [nullable(text), number],
    (value, parameters, _locale) => [value, parameters[0]],
  ),

  wordCount: adapt(wordCount, [nullable(text), optional(text)], (value, _parameters, locale) => [
    value,
    locale,
  ]),
  truncateWords: adapt(
    truncateWords,
    [nullable(text), optional(number), optional(text), optional(text)],
    (value, parameters, locale) => [value, parameters[0], parameters[1], locale],
  ),
  wrapWords: adapt(wrapWords, [nullable(text), optional(number)], (value, parameters, _locale) => [
    value,
    parameters[0],
  ]),
  readingTime: adapt(
    readingTime,
    [nullable(text), optional(number), optional(text)],
    (value, parameters, locale) => [value, parameters[0], locale],
  ),
  normalizeWhitespace: adapt(
    normalizeWhitespace,
    [nullable(text)],
    (value, _parameters, _locale) => [value],
  ),
  stripDiacritics: adapt(stripDiacritics, [nullable(text)], (value, _parameters, _locale) => [
    value,
  ]),
  excerpt: adapt(
    excerpt,
    [nullable(text), text, optional(number), optional(text)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1], parameters[2]],
  ),
  highlightMatches: adapt(
    highlightMatches,
    [nullable(text), text],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  humanizeIdentifier: adapt(humanizeIdentifier, [nullable(text)], (value, _parameters, _locale) => [
    value,
  ]),
  escapeRegExp: adapt(escapeRegExp, [nullable(text)], (value, _parameters, _locale) => [value]),
  graphemeCount: adapt(graphemeCount, [nullable(text)], (value, _parameters, _locale) => [value]),
  splitLines: adapt(splitLines, [nullable(text)], (value, _parameters, _locale) => [value]),
} satisfies Readonly<Record<string, PipeAdapter>>;
