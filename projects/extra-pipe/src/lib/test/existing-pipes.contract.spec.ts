import {
  Base64ImageUrlPipe,
  CamelCaseToTitleSeparatedCasePipe,
  CamelToSnakePipe,
  CapitalizePipe,
  FileSizePipe,
  FormatDateTimePipe,
  HidePipe,
  IncludesPipe,
  LocalizedDatePipe,
  NumberToWordsPipe,
  RemoveByKeyPipe,
  RemoveDuplicatesByKeyPipe,
  ReplaceCommaPipe,
  RoundHalfPipe,
  SnakeToCamelPipe,
  UnderscoreToTitlePipe,
  UpperCaseFromPipe,
} from '../../public-api';

describe('existing public pipe contracts', () => {
  it('retains every v1.0 public pipe and its core behavior', () => {
    expect(new CamelToSnakePipe().transform('extraPipe')).toBe('extra_pipe');
    expect(new CamelCaseToTitleSeparatedCasePipe().transform('extraPipe')).toBe(
      'extra Pipe'
    );
    expect(new CapitalizePipe().transform('extra')).toBe('Extra');
    expect(new FileSizePipe().transform(1_048_576)).toBe('1.00MB');
    expect(
      new FormatDateTimePipe().transform(new Date(2024, 0, 2))
    ).not.toContain(':');
    expect(new HidePipe().transform('secret')).toBe('******');
    expect(new Base64ImageUrlPipe().transform('abc', 'image/png')).toBe(
      'data:image/png;base64,abc'
    );
    expect(new IncludesPipe().transform([0, 1], 0)).toBeTrue();
    expect(new LocalizedDatePipe().transform(new Date(2024, 0, 2), 'en-US')).toBe(
      new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }).format(new Date(2024, 0, 2))
    );
    expect(new NumberToWordsPipe().transform(42, 'en')).toBe('Forty-Two');
    expect(
      new RemoveByKeyPipe().transform(
        [
          { id: 1, value: 'remove' },
          { id: 2, value: 'keep' },
        ],
        'id',
        [1]
      )
    ).toEqual([{ id: 2, value: 'keep' }]);
    expect(
      new RemoveDuplicatesByKeyPipe().transform(
        [
          { id: 1, value: 'first' },
          { id: 1, value: 'last' },
        ],
        'id'
      )
    ).toEqual([{ id: 1, value: 'last' }]);
    expect(new ReplaceCommaPipe().transform('12,5')).toBe(12.5);
    expect(new RoundHalfPipe().transform(2.455)).toBe(2.46);
    expect(new SnakeToCamelPipe().transform('extra_pipe')).toBe('extraPipe');
    expect(new UnderscoreToTitlePipe().transform('extra_pipe')).toBe(
      'extra pipe'
    );
    expect(new UpperCaseFromPipe().transform('extra', 1)).toBe('eXtra');
  });
});
