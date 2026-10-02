import { UnderscoreToTitlePipe } from './pipes/underscore-to-title.pipe';

describe('UnderscoreToTitlePipe', () => {
  let pipe: UnderscoreToTitlePipe;

  beforeEach(() => {
    pipe = new UnderscoreToTitlePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform underscore separated string to title case', () => {
    const input = 'hello_world';
    const transformed = pipe.transform(input);
    expect(transformed).toBe('hello world');
  });
});
