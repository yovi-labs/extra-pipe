import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'base64ImageUrl',
})
export class Base64ImageUrlPipe implements PipeTransform {
  transform(
    base64: null | string | undefined,
    mimeType: null | string | undefined
  ): string {
    if (
      typeof base64 !== 'string' ||
      typeof mimeType !== 'string' ||
      mimeType === ''
    ) {
      return '';
    }

    return `data:${mimeType};base64,${base64}`;
  }
}
