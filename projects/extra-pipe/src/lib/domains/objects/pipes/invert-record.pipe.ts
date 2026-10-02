import { Pipe, PipeTransform } from '@angular/core';
import { invertRecord } from '../objects.functions';
export { invertRecord } from '../objects.functions';
/** Invert scalar mappings while preserving duplicate-value keys. */
@Pipe({ name: 'invertRecord', standalone: true, pure: true })
export class InvertRecordPipe implements PipeTransform {
  transform(
    value:
      | Readonly<Record<string, string | number | boolean>>
      | null
      | undefined
  ): Record<string, string[]> | null {
    return invertRecord(value);
  }
}
