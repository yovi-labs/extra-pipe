import { ROUND_HALF_PARAMS } from './round-half.constants';

export type RoundHalfParam =
  (typeof ROUND_HALF_PARAMS)[keyof typeof ROUND_HALF_PARAMS];
