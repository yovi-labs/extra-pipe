import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'hide',
})
export class HidePipe implements PipeTransform {
  transform(
    value: null | string | undefined,
    hide: boolean = true,
    symbol: string = '*'
  ): string {
    if (typeof value !== 'string') return '';

    return hide ? symbol.repeat(value.length) : value;
  }
}
