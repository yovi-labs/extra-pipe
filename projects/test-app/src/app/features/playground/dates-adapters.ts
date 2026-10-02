import {
  businessDaysDifference,
  calendarDayDifference,
  dateBucket,
  dateParts,
  dateSequence,
  formatDateRange,
  FormatDateTimePipe,
  FormatDurationPipe,
  isoWeek,
  isWithinInterval,
  LocalizedDatePipe,
  overlapDuration,
  quarter,
  RelativeTimePipe,
  unixTimestamp,
} from 'extra-pipe';
import type { PipeAdapter } from './json-contracts';
import {
  adapt,
  arrayOf,
  boolean,
  dateInput,
  dateRangeOptions,
  nullable,
  number,
  oneOf,
  optional,
  text,
  validDate,
} from './json-contracts';
const formatDurationPipe = new FormatDurationPipe('en-US');
const relativeTimePipe = new RelativeTimePipe('en-US');
const formatDateTimePipe = new FormatDateTimePipe();
const localizedDatePipe = new LocalizedDatePipe();
export const DATES_ADAPTERS = {
  dateRange: adapt(
    formatDateRange,
    [nullable(dateInput), nullable(dateInput), dateRangeOptions, optional(text)],
    (value, parameters, locale) => [value, parameters[0], parameters[1], locale],
  ),
  formatDuration: adapt(
    formatDurationPipe.transform.bind(formatDurationPipe),
    [
      nullable(number),
      optional(oneOf('hours', 'milliseconds', 'minutes', 'seconds')),
      optional(oneOf('long', 'short', 'narrow')),
      optional(text),
    ],
    (value, parameters, locale) => [value, parameters[0], parameters[1], locale],
  ),
  relativeTime: adapt(
    relativeTimePipe.transform.bind(relativeTimePipe),
    [nullable(dateInput), optional(dateInput), optional(text)],
    (value, parameters, locale) => [value, parameters[0], locale],
  ),
  formatDateTime: adapt(
    formatDateTimePipe.transform.bind(formatDateTimePipe),
    [validDate, optional(boolean), optional(boolean)],
    (value, parameters, _locale) => [
      typeof value === 'string' || typeof value === 'number' ? new Date(value) : value,
      parameters[0],
      parameters[1],
    ],
  ),
  localizedDate: adapt(
    localizedDatePipe.transform.bind(localizedDatePipe),
    [nullable(dateInput), optional(text)],
    (value, _parameters, locale) => [value, locale],
  ),

  dateParts: adapt(
    dateParts,
    [nullable(dateInput), optional(text), optional(text)],
    (value, parameters, locale) => [value, parameters[0], locale],
  ),
  calendarDayDifference: adapt(
    calendarDayDifference,
    [nullable(dateInput), dateInput],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  isWithinInterval: adapt(
    isWithinInterval,
    [nullable(dateInput), dateInput, dateInput],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  overlapDuration: adapt(
    overlapDuration,
    [nullable(dateInput), dateInput, dateInput, dateInput],
    (value, parameters, _locale) => [value, parameters[0], parameters[1], parameters[2]],
  ),
  isoWeek: adapt(isoWeek, [nullable(dateInput)], (value, _parameters, _locale) => [value]),
  quarter: adapt(quarter, [nullable(dateInput)], (value, _parameters, _locale) => [value]),
  unixTimestamp: adapt(unixTimestamp, [nullable(dateInput)], (value, _parameters, _locale) => [
    value,
  ]),
  dateBucket: adapt(
    dateBucket,
    [nullable(dateInput), optional(oneOf('day', 'week', 'month', 'quarter', 'year'))],
    (value, parameters, _locale) => [value, parameters[0]],
  ),
  businessDaysDifference: adapt(
    businessDaysDifference,
    [nullable(dateInput), dateInput, optional(arrayOf(dateInput))],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
  dateSequence: adapt(
    dateSequence,
    [nullable(dateInput), dateInput, optional(number)],
    (value, parameters, _locale) => [value, parameters[0], parameters[1]],
  ),
} satisfies Readonly<Record<string, PipeAdapter>>;
