import { ROUND_HALF_PARAMS } from './round-half.constants';
import { RoundHalfParam } from './round-half.types';

function roundHalfUp(number: number): number {
  return +(Math.round(+(number + 'e+2')) + 'e-2');
}

function roundHalfDown(number: number): number {
  return -(Math.round(-(number + 'e+2')) + 'e-2');
}

export function roundHalfFacade(number: number, type: RoundHalfParam) {
  return type === ROUND_HALF_PARAMS.up
    ? roundHalfUp(number)
    : roundHalfDown(number);
}
