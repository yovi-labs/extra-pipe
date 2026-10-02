import { RemoveDuplicatesByKeyPipe } from './pipes/remove-duplicates-by-key.pipe';

describe('RemoveDuplicatesByKeyPipe', () => {
  let pipe: RemoveDuplicatesByKeyPipe;

  beforeEach(() => {
    pipe = new RemoveDuplicatesByKeyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if input array is empty', () => {
    const arrayData: Record<string, unknown>[] = [];
    const key = 'name';

    expect(pipe.transform(arrayData, key)).toEqual([]);
  });
});
