import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
  transform(size: number | null | undefined, extension: string = 'MB'): string {
    if (typeof size !== 'number' || !Number.isFinite(size)) return '';

    return (size / (1024 * 1024)).toFixed(2) + extension;
  }
}

