import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to check if an array includes a specific element.
 */
@Pipe({
  standalone: true,
  name: 'includes',
  pure: false,
})
export class IncludesPipe implements PipeTransform {
  /**
   * Checks if an array includes a specific element.
   * @param items - The array to check.
   * @param element - The element to search for.
   * @returns True if the element is found in the array, otherwise false.
   */
  transform(
    items: null | readonly unknown[] | undefined,
    element: unknown
  ): boolean {
    return Array.isArray(items) && items.includes(element);
  }
}
