import { TestBed } from '@angular/core/testing';
import { RemoveByKeyPipe } from './pipes/remove-by-key.pipe';

describe('RemoveByKeyPipe', () => {
  let pipe: RemoveByKeyPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveByKeyPipe],
    });
    pipe = TestBed.inject(RemoveByKeyPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter out elements based on the specified key and filter criteria', () => {
    const arrayData = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
      { id: 3, name: 'Jane' },
    ];
    const key = 'id';
    const filter = [1, 2];
    const expectedResult = [{ id: 3, name: 'Jane' }];
    expect(pipe.transform(arrayData, key, filter)).toEqual(expectedResult);
  });
});
