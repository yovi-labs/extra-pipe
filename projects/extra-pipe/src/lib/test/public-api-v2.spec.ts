import * as publicApi from '../../public-api';

describe('2.0 canonical public names', () => {
  it('exports corrected standalone classes without obsolete aliases', () => {
    expect(publicApi.CamelCaseToTitleSeparatedCasePipe).toBeDefined();
    expect(publicApi.FileSizePipe).toBeDefined();
    expect(publicApi.FormatDateTimePipe).toBeDefined();
    expect(publicApi.Base64ImageUrlPipe).toBeDefined();
    expect(publicApi.LocalizedDatePipe).toBeDefined();
    const exported = publicApi as unknown as Record<string, unknown>;
    for (const name of ['CamelCaseToTitleSeperatedCasePipe', 'FileSizeAliasPipe',
      'FormatInstanceofDatePipe', 'Base64ImgUrlPipe', 'LocalizedPipe',
      'LocalizedLegacyPipe', 'RoundHalfUpPipe']) expect(exported[name]).toBeUndefined();
  });
  it('retains canonical rounding modes rather than a second alias pipe', () => {
    expect(new publicApi.RoundHalfPipe().transform(2.455, 'up')).toBe(2.46);
    expect(new publicApi.RoundHalfPipe().transform(2.455, 'down')).toBe(2.45);
  });
});
