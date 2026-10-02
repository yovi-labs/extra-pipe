import { UpperCaseFromPipe } from '../../../public-api';

describe('UpperCaseFromPipe', () => {
  let pipe: UpperCaseFromPipe;

  beforeEach(() => {
    pipe = new UpperCaseFromPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the input string with uppercase letter at the specified index', () => {
    const inputString = 'abcdef';
    const indexToUpperCase = 2;

    const result = pipe.transform(inputString, indexToUpperCase);

    expect(result).toEqual('abCdef');
  });

  it('should handle an empty input string', () => {
    const inputString = '';
    const indexToUpperCase = 2;

    const result = pipe.transform(inputString, indexToUpperCase);

    expect(result).toEqual('');
  });
});
