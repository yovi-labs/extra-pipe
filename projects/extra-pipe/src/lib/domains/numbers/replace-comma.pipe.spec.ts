import { ReplaceCommaPipe } from '../../../public-api';

describe('ReplaceCommaPipe', () => {
  let pipe: ReplaceCommaPipe;

  beforeEach(() => {
    pipe = new ReplaceCommaPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should replace comma with dot', () => {
    expect(pipe.transform('1234')).toBe(1234);
    expect(pipe.transform('2345,67')).toBe(2345.67);
    expect(pipe.transform('0')).toBe(0);
  });

  it('should handle numeric input', () => {
    expect(pipe.transform(1234)).toBe(1234);
    expect(pipe.transform(1234.56)).toBe(1234.56);
    expect(pipe.transform(0)).toBe(0);
  });
});
