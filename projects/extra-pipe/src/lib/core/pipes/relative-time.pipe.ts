import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

import {
  DateInput,
  resolveLocale,
  toValidDate,
} from '../../shared/helper/intl.helper';

type RelativeTimeUnit = Intl.RelativeTimeFormatUnit;

const relativeTimeUnits: ReadonlyArray<{
  milliseconds: number;
  unit: RelativeTimeUnit;
}> = [
  { unit: 'year', milliseconds: 31_536_000_000 },
  { unit: 'month', milliseconds: 2_592_000_000 },
  { unit: 'week', milliseconds: 604_800_000 },
  { unit: 'day', milliseconds: 86_400_000 },
  { unit: 'hour', milliseconds: 3_600_000 },
  { unit: 'minute', milliseconds: 60_000 },
  { unit: 'second', milliseconds: 1_000 },
];

/**
 * Formats a date relative to a caller-controlled reference time. Bind a new
 * reference time from the component when the display should refresh.
 */
@Pipe({
  standalone: true,
  name: 'relativeTime',
  pure: true,
})
export class RelativeTimePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}

  transform(
    value: DateInput | null | undefined,
    referenceTime: DateInput = new Date(),
    locale?: string
  ): string {
    const date = toValidDate(value);
    const reference = toValidDate(referenceTime);

    if (!date || !reference) return '';

    const difference = date.getTime() - reference.getTime();
    const matchedUnit =
      relativeTimeUnits.find(
        ({ milliseconds }) => Math.abs(difference) >= milliseconds
      ) ?? relativeTimeUnits[relativeTimeUnits.length - 1];
    const amount = Math.round(difference / matchedUnit.milliseconds);

    return new Intl.RelativeTimeFormat(
      resolveLocale(locale, this.defaultLocale),
      { numeric: 'auto' }
    ).format(amount, matchedUnit.unit);
  }
}
