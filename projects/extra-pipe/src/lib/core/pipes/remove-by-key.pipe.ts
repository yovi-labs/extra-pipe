import { Pipe, PipeTransform } from '@angular/core';

/**
 * A custom Angular pipe that removes elements from an array based on a specified key.
 */
@Pipe({
  standalone: true,
  name: 'removeByKey',
  pure: false,
})
export class RemoveByKeyPipe implements PipeTransform {
  /**
   * Transforms an array by removing elements based on a specified key and filter criteria.
   * @template ArrayData The type of the array elements.
   * @param {Array<ArrayData>} arrayData The array to be transformed.
   * @param {keyof ArrayData} key The key used to access the property for filtering.
   * @param {unknown[]} filter An array of values to filter out.
   * @returns {Array<ArrayData>} The transformed array.
   */
  transform<ArrayData>(
    arrayData: ArrayData[],
    key: keyof ArrayData,
    filter: unknown[]
  ): ArrayData[] {
    if (!arrayData || !Array.isArray(arrayData)) {
      return arrayData;
    }

    const filteredData: ArrayData[] = arrayData.filter(
      data => !filter.includes(data[key])
    );

    return filteredData;
  }
}
