import { CamelCaseToTitleSeparatedCasePipe } from './pipes/camel-case-to-title-separated-case.pipe';

describe('CamelCaseToTitleSeparatedCasePipe', () => {
  let pipe: CamelCaseToTitleSeparatedCasePipe;

  beforeEach(() => {
    pipe = new CamelCaseToTitleSeparatedCasePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "camelCaseString" to "camel Case String"', () => {
    const input = 'camelCaseString';
    const transformed = pipe.transform(input);
    expect(transformed).toBe('camel Case String');
  });
});
