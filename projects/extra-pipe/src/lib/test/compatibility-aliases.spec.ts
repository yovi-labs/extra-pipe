import {
  CamelCaseToTitleSeparatedCasePipe,
  FileSizeAliasPipe,
  LocalizedLegacyPipe,
  LocalizedPipe,
  RoundHalfUpPipe,
} from '../../public-api';

describe('compatibility aliases', () => {
  it('keeps the documented localized selector behavior available', () => {
    const value = new Date('2024-01-02T00:00:00.000Z');
    expect(new LocalizedLegacyPipe().transform(value, 'en-US')).toBe(
      new LocalizedPipe().transform(value, 'en-US')
    );
  });

  it('exposes corrected and README-compatible selector aliases', () => {
    expect(new CamelCaseToTitleSeparatedCasePipe().transform('extraPipe')).toBe(
      'extra Pipe'
    );
    expect(new FileSizeAliasPipe().transform(1_048_576)).toBe('1.00MB');
    expect(new RoundHalfUpPipe().transform(2.455)).toBe(2.46);
  });
});
