import { CapitalizePipe } from '../../../public-api';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize the first letter of a word', () => {
    const input = 'hello';
    const result = pipe.transform(input);
    expect(result).toBe('Hello');
  });

  it('should leave empty string unchanged', () => {
    const input = '';
    const result = pipe.transform(input);
    expect(result).toBe('');
  });

  it('should handle a single letter', () => {
    const input = 'a';
    const result = pipe.transform(input);
    expect(result).toBe('A');
  });

  it('should handle a single letter followed by other characters', () => {
    const input = 'aBC';
    const result = pipe.transform(input);
    expect(result).toBe('ABC');
  });
});
