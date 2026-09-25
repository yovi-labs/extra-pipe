import { Pipe, PipeTransform } from '@angular/core';

export function toTitleSeparatedCase(value: unknown): string {
  return typeof value === 'string' ? value.replace(/([A-Z])/g, ' $1') : '';
}

/** @deprecated Use CamelCaseToTitleSeparatedCasePipe and its corrected selector. */
@Pipe({
  standalone: true,
  name: 'camelCaseToTitleSeperatedCase',
})
export class CamelCaseToTitleSeperatedCasePipe implements PipeTransform {
  /**
   * Transforms a camel case string to title separated case.
   * @param value - The string to transform.
   * @returns The transformed string.
   */
  transform(value: unknown): string {
    return toTitleSeparatedCase(value);
  }
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
