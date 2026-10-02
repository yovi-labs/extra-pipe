import { snapshot, freeze } from '../../testing/immutable-test-inputs';
import {
  EscapeRegExpPipe,
  ExcerptPipe,
  GraphemeCountPipe,
  HighlightMatchesPipe,
  HumanizeIdentifierPipe,
  NormalizeWhitespacePipe,
  ReadingTimePipe,
  SplitLinesPipe,
  StripDiacriticsPipe,
  TruncateWordsPipe,
  WordCountPipe,
  WrapWordsPipe,
  escapeRegExp,
  excerpt,
  graphemeCount,
  highlightMatches,
  humanizeIdentifier,
  normalizeWhitespace,
  readingTime,
  splitLines,
  stripDiacritics,
  truncateWords,
  wordCount,
  wrapWords,
} from '../../../public-api';


describe('text toolbox exports', () => {
  describe('wordCount', () => {
    const invoke = wordCount as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 'Hello world';
      const args: unknown[] = [];
      const expected = 2;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new WordCountPipe('en-US');
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 'Hello world';
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('truncateWords', () => {
    const invoke = truncateWords as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 'Hello brave world';
      const args: unknown[] = [2];
      const expected = 'Hello brave…';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new TruncateWordsPipe('en-US');
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...[2]))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 'Hello brave world';
      const args: unknown[] = [2];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('wrapWords', () => {
    const invoke = wrapWords as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 'one two three';
      const args: unknown[] = [7];
      const expected = 'one two\nthree';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new WrapWordsPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...[7]))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 'one two three';
      const args: unknown[] = [7];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('readingTime', () => {
    const invoke = readingTime as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 'one two three';
      const args: unknown[] = [200];
      const expected = '1 min';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new ReadingTimePipe('en-US');
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...[200]))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 'one two three';
      const args: unknown[] = [200];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('normalizeWhitespace', () => {
    const invoke = normalizeWhitespace as unknown as (
      ...args: unknown[]
    ) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '  Ana\t  Sam \n';
      const args: unknown[] = [];
      const expected = 'Ana Sam';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new NormalizeWhitespacePipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '  Ana\t  Sam \n';
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('stripDiacritics', () => {
    const invoke = stripDiacritics as unknown as (
      ...args: unknown[]
    ) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 'Café عربي';
      const args: unknown[] = [];
      const expected = 'Cafe عربي';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new StripDiacriticsPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 'Café عربي';
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('excerpt', () => {
    const invoke = excerpt as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 'zero one two three';
      const args: unknown[] = ['two', 12];
      const expected = '… one two t…';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new ExcerptPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...['two', 12]))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 'zero one two three';
      const args: unknown[] = ['two', 12];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('highlightMatches', () => {
    const invoke = highlightMatches as unknown as (
      ...args: unknown[]
    ) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 'Ana and Ana';
      const args: unknown[] = ['Ana'];
      const expected = [
        { text: 'Ana', matched: true },
        { text: ' and ', matched: false },
        { text: 'Ana', matched: true },
      ];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new HighlightMatchesPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...['Ana']))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 'Ana and Ana';
      const args: unknown[] = ['Ana'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('humanizeIdentifier', () => {
    const invoke = humanizeIdentifier as unknown as (
      ...args: unknown[]
    ) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 'XMLHttpRequest_id';
      const args: unknown[] = [];
      const expected = 'XML Http Request id';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new HumanizeIdentifierPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 'XMLHttpRequest_id';
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('escapeRegExp', () => {
    const invoke = escapeRegExp as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 'a+b?';
      const args: unknown[] = [];
      const expected = 'a\\+b\\?';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new EscapeRegExpPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 'a+b?';
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('graphemeCount', () => {
    const invoke = graphemeCount as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '👩🏽‍💻é';
      const args: unknown[] = [];
      const expected = 2;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new GraphemeCountPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '👩🏽‍💻é';
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('splitLines', () => {
    const invoke = splitLines as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 'one\r\ntwo\n';
      const args: unknown[] = [];
      const expected = ['one', 'two', ''];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new SplitLinesPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 123].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 'one\r\ntwo\n';
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
});

describe('text boundaries and localization', () => {
  it('validates secondary parameters and protects match grapheme boundaries', () => {
    expect(truncateWords('one two', 1, 2 as never)).toBe('');
    expect(excerpt('text', 't', -1)).toBe('');
    expect(excerpt('text', null as never)).toBe('');
    expect(excerpt('text', 't', 3, 3 as never)).toBe('');
    expect(excerpt('text', 'missing', 100)).toBe('');
    expect(excerpt('text long', 't', 5)).toBe('tex…');
    expect(excerpt('long text', 't', 5)).toBe('… te…');
    expect(excerpt('long text', 'x', 7)).toBe('… text');
    expect(highlightMatches('é 👨‍👩‍👧‍👦', 'e')).toEqual([
      { text: 'é 👨‍👩‍👧‍👦', matched: false },
    ]);
    expect(highlightMatches('👨‍👩‍👧‍👦', '👩')).toEqual([
      { text: '👨‍👩‍👧‍👦', matched: false },
    ]);
    expect(highlightMatches('text', 3 as never)).toEqual([]);
    expect(wrapWords('\n')).toBe('\n');
    expect(
      new TruncateWordsPipe('fr-FR').transform('one two', 1, '…', 'en-US')
    ).toBe('one…');
  });
  it('bounds lengths and handles empty/query-free text', () => {
    expect(truncateWords('one two', 0)).toBe('');
    expect(truncateWords('one', -1)).toBe('');
    expect(truncateWords('one', 10)).toBe('one');
    expect(truncateWords('', 10)).toBe('');
    expect(wrapWords('one', 0)).toBe('');
    expect(wrapWords('overlong\n a b', 2)).toBe('overlong\na\nb');
    expect(readingTime('', 200)).toContain('0');
    expect(readingTime('one', 0)).toBe('');
    expect(excerpt('text', '', 4)).toBe('');
    expect(excerpt('text', 'a', 0)).toBe('');
    expect(excerpt('long example', 'missing', 4)).toBe('');
    expect(excerpt('text', 't', 10)).toBe('text');
    expect(excerpt('text long', 'text', 1, '…')).toBe('…');
    expect(highlightMatches('text', '')).toEqual([
      { text: 'text', matched: false },
    ]);
    expect(highlightMatches('', '')).toEqual([]);
    expect(highlightMatches('plain text', 'text')).toEqual([
      { text: 'plain ', matched: false },
      { text: 'text', matched: true },
    ]);
    expect(highlightMatches('none', 'missing')).toEqual([
      { text: 'none', matched: false },
    ]);
  });
  it('keeps graphemes and non-Latin diacritics intact', () => {
    expect(graphemeCount('👨‍👩‍👧‍👦🇲🇦é')).toBe(3);
    expect(stripDiacritics('Café عَرَبِي')).toBe('Cafe عَرَبِي');
    expect(escapeRegExp('[a].*+$^?(){}|\\')).toBe(
      '\\[a\\]\\.\\*\\+\\$\\^\\?\\(\\)\\{\\}\\|\\\\'
    );
    expect(wrapWords('👩🏽‍💻 hi team', 4)).toBe('👩🏽‍💻 hi\nteam');
  });
  it('uses real English, French and Arabic Intl minute output', () => {
    ['en-US', 'fr-FR', 'ar-MA'].forEach(locale => {
      expect(readingTime('one two', 200, locale)).toBe(
        new Intl.NumberFormat(locale, {
          style: 'unit',
          unit: 'minute',
          unitDisplay: 'short',
          maximumFractionDigits: 0,
        }).format(1)
      );
      expect(new ReadingTimePipe(locale).transform('one two')).toBe(
        readingTime('one two', 200, locale)
      );
      expect(new WordCountPipe(locale).transform('Ana Sam')).toBe(2);
      expect(new TruncateWordsPipe(locale).transform('Ana Sam Lee', 2)).toBe(
        'Ana Sam…'
      );
    });
    expect(
      new ReadingTimePipe('fr-FR').transform('one', 200, 'invalid_locale')
    ).toBe(readingTime('one', 200, 'fr-FR'));
  });
  it('works without native word segmentation', () => {
    const runtime = Intl as unknown as { Segmenter?: unknown };
    const original = runtime.Segmenter;
    runtime.Segmenter = undefined;
    try {
      expect(wordCount("Ana's عربي")).toBe(2);
      expect(truncateWords('one two three', 2)).toBe('one two…');
    } finally {
      runtime.Segmenter = original;
    }
  });
});
