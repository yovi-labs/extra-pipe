import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to format Date objects.
 */
@Pipe({
  standalone: true,
  name: 'formatInstanceofDate',
})
export class FormatInstanceofDatePipe implements PipeTransform {
  /**
   * Formats a Date object.
   * @param value - The Date object to format.
   * @param setNumberDateFormat - If true, uses numeric format for the month.
   * @param setTime - If true, includes time in the formatted result.
   * @returns The formatted date string.
   */
  transform(
    value: Date,
    setNumberDateFormat: boolean = false,
    setTime: boolean = false
  ): string {
    if (!(value instanceof Date)) {
      return String(value);
    }

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: setNumberDateFormat ? 'numeric' : 'short',
      year: 'numeric',
    };

    if (setTime) {
      options.hour12 = true;
      options.hour = '2-digit';
      options.minute = '2-digit';
    }

    return new Intl.DateTimeFormat('en', options).format(value);
  }
}
