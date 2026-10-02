import { LocalizedDatePipe } from '../../../public-api';

describe('LocalizedDatePipe', () => {
  let pipe: LocalizedDatePipe;

  beforeEach(() => {
    pipe = new LocalizedDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
