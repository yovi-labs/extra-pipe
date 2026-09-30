import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'replaceComma',
})
export class ReplaceCommaPipe implements PipeTransform {
  transform(value: string | number): number {
    const formattedNumber: string = String(value).replace(',', '.');
    return +formattedNumber;
  }
}
