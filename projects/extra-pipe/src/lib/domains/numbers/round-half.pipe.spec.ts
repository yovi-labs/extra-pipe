import { RoundHalfPipe } from '../../../public-api';
import { ROUND_HALF_PARAMS } from './round-half.constants';

describe('RoundHalfPipe', () => {
  let pipe: RoundHalfPipe;

  beforeEach(() => {
    pipe = new RoundHalfPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should round up by default', () => {
    const result = pipe.transform(2.455);
    expect(result).toEqual(2.46);
  });

  it('should round down when specified', () => {
    const result = pipe.transform(2.455, ROUND_HALF_PARAMS.down);
    expect(result).toEqual(2.45);
  });

  it('should round up when specified', () => {
    const result = pipe.transform(2.455, ROUND_HALF_PARAMS.up);
    expect(result).toEqual(2.46);
  });
});
