import {
  dateParts,
  calendarDayDifference,
  isWithinInterval,
  overlapDuration,
  isoWeek,
  quarter,
  unixTimestamp,
  dateBucket,
  businessDaysDifference,
  dateSequence,
} from 'extra-pipe';
import type { PipeAdapter } from './expanded-adapters';
/** Whitelisted JSON boundary adapters; never compile expressions or mutate input. */
export const DATES_ADAPTERS: Readonly<Record<string, PipeAdapter>> = {
  dateParts: (value, parameters, locale) =>
    dateParts(value as never, parameters[0] as never, locale),
  calendarDayDifference: (value, parameters, _locale) =>
    calendarDayDifference(value as never, parameters[0] as never),
  isWithinInterval: (value, parameters, _locale) =>
    isWithinInterval(value as never, parameters[0] as never, parameters[1] as never),
  overlapDuration: (value, parameters, _locale) =>
    overlapDuration(
      value as never,
      parameters[0] as never,
      parameters[1] as never,
      parameters[2] as never,
    ),
  isoWeek: (value, _parameters, _locale) => isoWeek(value as never),
  quarter: (value, _parameters, _locale) => quarter(value as never),
  unixTimestamp: (value, _parameters, _locale) => unixTimestamp(value as never),
  dateBucket: (value, parameters, _locale) => dateBucket(value as never, parameters[0] as never),
  businessDaysDifference: (value, parameters, _locale) =>
    businessDaysDifference(value as never, parameters[0] as never, parameters[1] as never),
  dateSequence: (value, parameters, _locale) =>
    dateSequence(value as never, parameters[0] as never, parameters[1] as never),
};
