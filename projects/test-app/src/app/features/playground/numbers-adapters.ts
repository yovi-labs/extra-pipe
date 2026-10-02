import {
  basisPoints,
  clamp,
  CompactNumberPipe,
  FileSizePipe,
  formatByteSize,
  formatFraction,
  formatNumberRange,
  numberBase,
  NumberToWordsPipe,
  pluralCategory,
  ratio,
  ReplaceCommaPipe,
  RoundHalfPipe,
  roundTo,
  roundToStep,
} from 'extra-pipe';
import type { PipeAdapter } from './json-contracts';
import {
  adapt,
  byteSizeOptions,
  nonnegativeInteger,
  nullable,
  number,
  numberRangeOptions,
  oneOf,
  oneOfTypeTextNumber,
  optional,
  text,
} from './json-contracts';
const compactNumberPipe = new CompactNumberPipe('en-US');
const fileSizePipe = new FileSizePipe();
const numberToWordsPipe = new NumberToWordsPipe();
const replaceCommaPipe = new ReplaceCommaPipe();
const roundHalfPipe = new RoundHalfPipe();
export const NUMBERS_ADAPTERS = {
  numberRange: adapt(
    formatNumberRange,
    [nullable(number), nullable(number), numberRangeOptions, optional(text)],
    (value, parameters, locale) => [value, parameters[0], parameters[1], locale],
  ),
  byteSize: adapt(
    formatByteSize,
    [nullable(number), byteSizeOptions, optional(text)],
    (value, parameters, locale) => [value, parameters[0], locale],
  ),
  compactNumber: adapt(
    compactNumberPipe.transform.bind(compactNumberPipe),
    [nullable(number), optional(oneOf('compact', 'standard')), optional(number), optional(text)],
    (value, parameters, locale) => [value, parameters[0], parameters[1], locale],
  ),
  fileSize: adapt(
    fileSizePipe.transform.bind(fileSizePipe),
    [nullable(number), optional(text)],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  numberToWords: adapt(
    numberToWordsPipe.transform.bind(numberToWordsPipe),
    [nonnegativeInteger, oneOf('en', 'fr')],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  replaceComma: adapt(
    replaceCommaPipe.transform.bind(replaceCommaPipe),
    [oneOfTypeTextNumber],
    (value, _parameters, _locale) => [value],
  ),
  roundHalf: adapt(
    roundHalfPipe.transform.bind(roundHalfPipe),
    [number, optional(oneOf('up', 'down'))],
    (value, parameters, _locale) => [value, parameters[0]],
  ),

  clamp: adapt(clamp, [nullable(number), number, number], (value, parameters, _locale) => [
    value,
    parameters[0],
    parameters[1],
  ]),
  roundTo: adapt(roundTo, [nullable(number), optional(number)], (value, parameters, _locale) => [
    value,
    parameters[0],
  ]),
  roundToStep: adapt(
    roundToStep,
    [nullable(number), number, optional(number)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  ratio: adapt(ratio, [nullable(number), number], (value, parameters, _locale) => [
    value,
    parameters[0],
  ]),
  pluralCategory: adapt(
    pluralCategory,
    [nullable(number), optional(oneOf('cardinal', 'ordinal')), optional(text)],
    (value, parameters, locale) => [value, parameters[0], locale],
  ),
  formatFraction: adapt(
    formatFraction,
    [nullable(number), optional(number), optional(text)],
    (value, parameters, locale) => [value, parameters[0], locale],
  ),
  basisPoints: adapt(
    basisPoints,
    [nullable(number), optional(number), optional(text)],
    (value, parameters, locale) => [value, parameters[0], locale],
  ),
  numberBase: adapt(
    numberBase,
    [nullable(number), optional(number)],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
} satisfies Readonly<Record<string, PipeAdapter>>;
