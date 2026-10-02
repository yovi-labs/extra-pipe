import { IncludesPipe } from './pipes/includes.pipe';

describe('IncludesPipe', () => {
  let pipe: IncludesPipe;

  beforeEach(() => {
    pipe = new IncludesPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true if array includes element', () => {
    const items = [1, 2, 3, 4, 5];
    const element = 3;
    expect(pipe.transform(items, element)).toBe(true);
  });

  it('should return false if array does not include element', () => {
    const items = [1, 2, 3, 4, 5];
    const element = 6;
    expect(pipe.transform(items, element)).toBe(false);
  });

  it('should return false if array is empty', () => {
    const items: number[] = [];
    const element = 1;
    expect(pipe.transform(items, element)).toBe(false);
  });

  it('should return false if element is null or undefined', () => {
    const items = [1, 2, 3];
    const element: unknown = null;
    expect(pipe.transform(items, element)).toBe(false);

    const element2: unknown = undefined;
    expect(pipe.transform(items, element2)).toBe(false);
  });
});
