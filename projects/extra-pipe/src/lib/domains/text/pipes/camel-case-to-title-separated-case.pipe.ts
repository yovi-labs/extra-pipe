import { Pipe, PipeTransform } from '@angular/core';

export function toTitleSeparatedCase(value: unknown): string {
  return typeof value === 'string' ? value.replace(/([A-Z])/g, ' $1') : '';
}

/** Converts camel case strings to words using the corrected selector spelling. */
@Pipe({
  standalone: true,
  name: 'camelCaseToTitleSeparatedCase',
})
export class CamelCaseToTitleSeparatedCasePipe implements PipeTransform {
  transform(value: unknown): string {
    return toTitleSeparatedCase(value);
  }
}
