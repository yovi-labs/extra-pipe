import { Pipe, PipeTransform } from '@angular/core';
import { ROUND_HALF_PARAMS } from '../round-half.constants';
import { roundHalfFacade } from '../round-half';
import { RoundHalfParam } from '../round-half.types';

@Pipe({
  standalone: true,
  name: 'roundHalf',
})
export class RoundHalfPipe implements PipeTransform {
  transform(
    number: number,
    param: RoundHalfParam = ROUND_HALF_PARAMS.up
  ): number {
    return roundHalfFacade(number, param);
  }
}

