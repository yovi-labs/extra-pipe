import { Pipe, PipeTransform } from '@angular/core';
import { graphemeCount } from '../transformations/text-toolbox';
export { graphemeCount } from '../transformations/text-toolbox';
/** User-visible character limits for multilingual fields. */
@Pipe({ name: 'graphemeCount', standalone: true, pure: true })
export class GraphemeCountPipe implements PipeTransform {
  transform(value: string | null | undefined): number | null {
    return graphemeCount(value);
  }
}
