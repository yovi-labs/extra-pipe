import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'camelToSnake',
})
export class CamelToSnakePipe implements PipeTransform {
  /**
   * Transforms a camel case string to snake case.
   * @param value The camel case string to be transformed.
   * @returns The snake case string.
   */
  transform(value: string): string {
    if (!value) return '';

    return value.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
  }
}
