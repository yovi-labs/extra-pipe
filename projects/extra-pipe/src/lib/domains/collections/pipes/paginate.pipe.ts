import { Pipe, PipeTransform } from '@angular/core';
import { paginate } from '../collections.functions';
import { PageResult } from '../collections.types';
export { paginate } from '../collections.functions';
/** Generate page items and total-page metadata for client display. */
@Pipe({ name: 'paginate', standalone: true, pure: true })
export class PaginatePipe implements PipeTransform {
  transform<T>(
    value: readonly T[] | null | undefined,
    page = 1,
    pageSize = 20
  ): PageResult<T> | null {
    return paginate(value, page, pageSize);
  }
}
