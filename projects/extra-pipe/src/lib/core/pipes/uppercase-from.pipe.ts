import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'upperCaseFrom',
})
export class UpperCaseFromPipe implements PipeTransform {
  transform(value: null | string | undefined, args: number): string {
    if (!value || args < 0 || args >= value.length) {
      return value || '';
    }

    const letters = value.split('');
    letters[args] = letters[args].toUpperCase();

    return letters.join('');
  }
}
