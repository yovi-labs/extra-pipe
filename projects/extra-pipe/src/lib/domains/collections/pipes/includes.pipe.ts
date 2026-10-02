import { Pipe, PipeTransform } from '@angular/core';
import { containsValue } from '../selection';

@Pipe({ name: 'includes', standalone: true, pure: true })
export class IncludesPipe implements PipeTransform {
  transform(items: null | readonly unknown[] | undefined, candidate: unknown): boolean {
    return containsValue(items, candidate);
  }
}
