import { NumberToWordsPipe } from './pipes/number-to-words.pipe';

describe('NumberToWordsPipe', () => {
  let pipe: NumberToWordsPipe;

  beforeEach(() => {
    pipe = new NumberToWordsPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('retains the public conversion method after extracting shared tables', () => {
    expect(pipe.convertToWords(42, 'en')).toBe('Forty-Two');
  });

  it('should transform 0 to "Zero"', () => {
    const result = pipe.transform(0, 'en');
    expect(result).toBe('Zero');
  });

  it('should transform a number to words in English', () => {
    const result = pipe.transform(12345, 'en');
    expect(result).toBe('Twelve Thousand Three Hundred Forty-Five');
  });

  it('should transform a number to words in French', () => {
    const result = pipe.transform(6789, 'fr');
    expect(result).toBe('Six Mille Sept Cent Quatre-vingts-Neuf');
  });

  it('should handle numbers larger than the maximum supported', () => {
    const result = pipe.transform(1000000000000, 'en');
    expect(result).toBe('Number is too large to convert');
  });
});
