import { Base64ImageUrlPipe, formatList, formatUnit, getDisplayName } from 'extra-pipe';
import type { PipeAdapter } from './json-contracts';
import {
  adapt,
  arrayOf,
  displayNameOptions,
  listOptions,
  nullable,
  number,
  oneOf,
  optional,
  text,
  unitOptions,
} from './json-contracts';
const base64ImageUrlPipe = new Base64ImageUrlPipe();
export const DISPLAY_ADAPTERS = {
  listFormat: adapt(
    formatList,
    [nullable(arrayOf(text)), listOptions, optional(text)],
    (value, parameters, locale) => [value, parameters[0], locale],
  ),
  formatUnit: adapt(
    formatUnit,
    [nullable(number), text, unitOptions, optional(text)],
    (value, parameters, locale) => [value, parameters[0], parameters[1], locale],
  ),
  displayName: adapt(
    getDisplayName,
    [
      nullable(text),
      oneOf('language', 'region', 'script', 'currency', 'calendar', 'dateTimeField'),
      displayNameOptions,
      optional(text),
    ],
    (value, parameters, locale) => [value, parameters[0], parameters[1], locale],
  ),
  base64ImageUrl: adapt(
    base64ImageUrlPipe.transform.bind(base64ImageUrlPipe),
    [nullable(text), nullable(text)],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
} satisfies Readonly<Record<string, PipeAdapter>>;
