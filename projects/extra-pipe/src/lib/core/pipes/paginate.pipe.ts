import { Pipe, PipeTransform } from '@angular/core';
import { paginate } from '../transformations/collections-toolbox';
import { PageResult } from '../transformations/toolbox.types';
export { paginate } from '../transformations/collections-toolbox';
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
