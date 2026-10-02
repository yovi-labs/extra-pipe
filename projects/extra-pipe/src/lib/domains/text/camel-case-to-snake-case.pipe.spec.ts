import { CamelToSnakePipe } from '../../../public-api';

describe('CamelToSnakePipe', () => {
  let pipe: CamelToSnakePipe;

  beforeEach(() => {
    pipe = new CamelToSnakePipe();
  });

  it('transforms camel case string to snake case', () => {
    const input = 'helloWorld';
    const result = pipe.transform(input);
    expect(result).toBe('hello_world');
  });

  it('does not transform non-camel case string', () => {
    const input = 'hello_world';
    const result = pipe.transform(input);
    expect(result).toBe('hello_world');
  });

  it('handles empty string', () => {
    const input = '';
    const result = pipe.transform(input);
    expect(result).toBe('');
  });
});
