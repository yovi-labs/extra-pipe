import { Pipe, PipeTransform } from '@angular/core';
import { convertNumberToWords } from '../number-to-words';

@Pipe({ name: 'numberToWords', standalone: true, pure: true })
export class NumberToWordsPipe implements PipeTransform {
  transform(value: number, language: string): string {
    return value === 0 ? 'Zero' : convertNumberToWords(value, language);
  }
  convertToWords(value: number, language: string): string {
    return convertNumberToWords(value, language);
  }
}
