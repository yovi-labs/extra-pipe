import { SnakeToCamelPipe } from './pipes/snake-case-to-camel-case.pipe';

describe('SnakeToCamelPipe', () => {
  let pipe: SnakeToCamelPipe;

  beforeEach(() => {
    pipe = new SnakeToCamelPipe();
  });

  it('transforms snake case string to camel case', () => {
    const input = 'hello_world';
    const result = pipe.transform(input);
    expect(result).toBe('helloWorld');
  });

  it('does not transform non-snake case string', () => {
    const input = 'HelloWorld';
    const result = pipe.transform(input);
    expect(result).toBe('HelloWorld');
  });

  it('transforms multiple underscores in snake case string', () => {
    const input = 'hello_my_world';
    const result = pipe.transform(input);
    expect(result).toBe('helloMyWorld');
  });

  it('handles empty string', () => {
    const input = '';
    const result = pipe.transform(input);
    expect(result).toBe('');
  });
});
