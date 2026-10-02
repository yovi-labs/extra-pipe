import { HidePipe } from '../../../public-api';

describe('HidePipe', () => {
  let pipe: HidePipe;

  beforeEach(() => {
    pipe = new HidePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not hide the input string when hide is set to false', () => {
    const input = 'Hello, World!';
    const result = pipe.transform(input, false);

    expect(result).toBe(input);
  });

  it('should return an empty string when input is empty', () => {
    const input = '';
    const result = pipe.transform(input);

    expect(result).toBe('');
  });
});
