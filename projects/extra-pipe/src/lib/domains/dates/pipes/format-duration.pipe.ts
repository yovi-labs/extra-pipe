import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

import { resolveLocale } from '../../../internal/intl';

export type DurationStyle = 'long' | 'narrow' | 'short';
export type DurationUnit = 'hours' | 'milliseconds' | 'minutes' | 'seconds';

const millisecondsByUnit: Record<DurationUnit, number> = {
  hours: 3_600_000,
  milliseconds: 1,
  minutes: 60_000,
  seconds: 1_000,
};
const durationUnits: readonly DurationUnit[] = [
  'hours',
  'milliseconds',
  'minutes',
  'seconds',
];
const durationStyles: readonly DurationStyle[] = ['long', 'narrow', 'short'];

/** Formats a non-negative duration as localized hours, minutes, and seconds. */
@Pipe({
  standalone: true,
  name: 'formatDuration',
  pure: true,
})
export class FormatDurationPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}

  transform(
    value: number | null | undefined,
    unit: DurationUnit = 'milliseconds',
    style: DurationStyle = 'short',
    locale?: string
  ): string {
    if (
      !Number.isFinite(value) ||
      value === null ||
      value === undefined ||
      !durationUnits.includes(unit) ||
      !durationStyles.includes(style)
    ) {
      return '';
    }

    if (value < 0) return '';

    const localeToUse = resolveLocale(locale, this.defaultLocale);
    const totalSeconds = Math.floor((value * millisecondsByUnit[unit]) / 1_000);
    const hours = Math.floor(totalSeconds / 3_600);
    const minutes = Math.floor((totalSeconds % 3_600) / 60);
    const seconds = totalSeconds % 60;
    const parts: string[] = [];

    if (hours > 0)
      parts.push(this.formatUnit(hours, 'hour', style, localeToUse));
    if (minutes > 0) {
      parts.push(this.formatUnit(minutes, 'minute', style, localeToUse));
    }
    if (seconds > 0 || parts.length === 0) {
      parts.push(this.formatUnit(seconds, 'second', style, localeToUse));
    }

    return parts.join(' ');
  }

  private formatUnit(
    value: number,
    unit: Intl.NumberFormatOptions['unit'],
    style: DurationStyle,
    locale: string
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'unit',
      unit,
      unitDisplay: style,
    }).format(value);
  }
}
