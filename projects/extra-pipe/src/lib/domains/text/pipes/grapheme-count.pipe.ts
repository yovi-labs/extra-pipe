import { Pipe, PipeTransform } from '@angular/core';
import { graphemeCount } from '../text.functions';
export { graphemeCount } from '../text.functions';
/** User-visible character limits for multilingual fields. */
@Pipe({ name: 'graphemeCount', standalone: true, pure: true })
export class GraphemeCountPipe implements PipeTransform {
  transform(value: string | null | undefined): number | null {
    return graphemeCount(value);
  }
}
