import { FormatDateTimePipe } from './pipes/format-date-time.pipe';

describe('FormatDateTimePipe', () => {
  let pipe: FormatDateTimePipe;

  beforeEach(() => {
    pipe = new FormatDateTimePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
