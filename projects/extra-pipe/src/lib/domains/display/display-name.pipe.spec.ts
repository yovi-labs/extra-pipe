import {
  DisplayNamePipe,
  getDisplayName,
} from './pipes/display-name.pipe';
describe('displayName', () => {
  it('provides localized names for language, region and currency', () => {
    ['en', 'fr', 'ar'].forEach(locale =>
      expect(new DisplayNamePipe(locale).transform('MA', 'region')).toBe(
        new Intl.DisplayNames(locale, { type: 'region' }).of('MA')!
      )
    );
    expect(getDisplayName('fr', 'language')).toBe('French');
    expect(getDisplayName('USD', 'currency')).not.toBe('');
  });
  it('rejects malformed codes/types and honors fallback', () => {
    expect(getDisplayName(null, 'region')).toBe('');
    expect(getDisplayName('', 'region')).toBe('');
    expect(getDisplayName('invalid code', 'region')).toBe('');
    expect(getDisplayName('MA', 'bad' as 'region')).toBe('');
    expect(getDisplayName('ZZZ', 'currency', { fallback: 'none' })).toBe('');
    expect(new DisplayNamePipe('fr').transform('MA', 'region', {}, 'en')).toBe(
      getDisplayName('MA', 'region')
    );
  });
});
