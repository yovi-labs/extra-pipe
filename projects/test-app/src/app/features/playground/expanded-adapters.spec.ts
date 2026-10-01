import { EXPANDED_SAMPLES } from './expanded-samples';
import { EXPANDED_ADAPTERS } from './expanded-adapters';
import { evaluateInput } from './pipe-runner';
import { PIPE_DOCS, standaloneCode, templateCode } from '../../data/pipe-catalog';
const EXPECTED: Readonly<Record<string, unknown>> = {
  wordCount: 2,
  truncateWords: 'Hello brave…',
  wrapWords: 'one two\nthree',
  readingTime: '1 min',
  normalizeWhitespace: 'Ana Sam',
  stripDiacritics: 'Cafe عربي',
  excerpt: '… one two t…',
  highlightMatches: [
    {
      text: 'Ana',
      matched: true,
    },
    {
      text: ' and ',
      matched: false,
    },
    {
      text: 'Ana',
      matched: true,
    },
  ],
  humanizeIdentifier: 'XML Http Request id',
  escapeRegExp: 'a\\+b\\?',
  graphemeCount: 2,
  splitLines: ['one', 'two', ''],
  chunk: [[1, 2], [3]],
  flatten: [1, 2, 3],
  compact: [0, false, ''],
  partition: {
    matching: [
      {
        active: true,
      },
    ],
    remaining: [
      {
        active: false,
      },
    ],
  },
  zip: [
    [1, 'A'],
    [2, 'B'],
  ],
  unzip: [
    [1, 2],
    ['A', 'B'],
  ],
  slidingWindow: [
    [1, 2],
    [2, 3],
  ],
  pluck: [1, 2],
  filterBy: [
    {
      active: true,
    },
  ],
  intersectionBy: [
    {
      id: 2,
    },
  ],
  differenceBy: [
    {
      id: 1,
    },
  ],
  unionBy: [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ],
  symmetricDifferenceBy: [
    {
      id: 1,
    },
    {
      id: 3,
    },
  ],
  indexBy: [
    [
      1,
      {
        id: 1,
        name: 'Ana',
      },
    ],
    [
      2,
      {
        id: 2,
        name: 'Sam',
      },
    ],
  ],
  countBy: [
    {
      key: 'A',
      count: 2,
    },
    {
      key: 'B',
      count: 1,
    },
  ],
  mergeBy: [
    {
      id: 1,
      name: 'Ana',
      active: true,
    },
  ],
  paginate: {
    items: [1, 2],
    page: 1,
    pageSize: 2,
    totalItems: 3,
    totalPages: 2,
  },
  getPath: 'Ana',
  pick: {
    name: 'Ana',
  },
  omit: {
    name: 'Ana',
  },
  renameKeys: {
    name: 'Ana',
  },
  defaults: {
    name: 'Ana',
    active: false,
  },
  invertRecord: {
    x: ['a', 'b'],
  },
  pruneEmpty: {
    b: 0,
    c: false,
  },
  pathEntries: [
    {
      path: ['profile', 'name'],
      value: 'Ana',
    },
  ],
  sumBy: 6,
  averageBy: 3,
  minBy: {
    amount: 2,
  },
  maxBy: {
    amount: 4,
  },
  summarizeBy: {
    count: 2,
    sum: 6,
    mean: 3,
    min: 2,
    max: 4,
  },
  percentileBy: 3,
  weightedAverageBy: 3.5,
  extentBy: [2, 4],
  cumulativeSum: [1, 3, 6],
  movingAverage: [1.5, 2.5],
  histogram: [
    {
      lower: 0,
      upper: 1.5,
      count: 2,
    },
    {
      lower: 1.5,
      upper: 3,
      count: 2,
    },
  ],
  percentageChange: 20,
  clamp: 100,
  roundTo: 12.35,
  roundToStep: 7.5,
  ratio: 1.5,
  pluralCategory: 'other',
  formatFraction: '3/2',
  basisPoints: '125 bp',
  numberBase: 'ff',
  calendarDayDifference: 1,
  isWithinInterval: true,
  overlapDuration: 3600000,
  isoWeek: {
    year: 2026,
    week: 1,
  },
  quarter: 2,
  unixTimestamp: 1,
  dateBucket: '2026-05-01T00:00:00.000Z',
  businessDaysDifference: 1,
  dateSequence: [
    '2026-01-01T00:00:00.000Z',
    '2026-01-02T00:00:00.000Z',
    '2026-01-03T00:00:00.000Z',
  ],
};
describe('67 expansion examples', () => {
  it('keeps samples, docs and explicit adapters aligned', () => {
    expect(Object.keys(EXPANDED_SAMPLES).length).toBe(67);
    expect(EXPANDED_ADAPTERS.size).toBe(67);
    Object.entries(EXPANDED_SAMPLES).forEach(([selector, sample]) => {
      expect(PIPE_DOCS.some((p) => p.selector === selector)).toBe(true);
      const fn = EXPANDED_ADAPTERS.get(selector)!;
      const result = fn(sample.input, sample.parameters, 'en-US');
      if (selector !== 'dateParts')
        expect(
          result instanceof Map ? Array.from(result.entries()) : JSON.parse(JSON.stringify(result)),
        ).toEqual(EXPECTED[selector]);
      else expect((result as unknown[]).length).toBeGreaterThan(0);
    });
  });
  it('renders maps and imports structured-output pipes correctly', () => {
    expect(evaluateInput('indexBy', '[{"id":1}]', '["id"]', 'en').output).toContain('"id": 1');
    const pipe = PIPE_DOCS.find((p) => p.selector === 'indexBy')!;
    expect(standaloneCode(pipe)).toContain('KeyValuePipe');
    expect(templateCode(pipe)).toContain('| keyvalue | json');
    expect(templateCode(PIPE_DOCS.find((p) => p.selector === 'summarizeBy')!)).toContain('| json');
    expect(templateCode(PIPE_DOCS.find((p) => p.selector === 'averageBy')!)).not.toContain(
      '| json',
    );
  });
  it('bounds nested collections, nesting and parameter counts', () => {
    expect(
      evaluateInput('getPath', JSON.stringify({ items: Array(501).fill(1) }), '[["items"]]', 'en')
        .error,
    ).toContain('500');
    let value: unknown = 1;
    for (let i = 0; i < 13; i++) value = { nested: value };
    expect(evaluateInput('pathEntries', JSON.stringify(value), '[]', 'en').error).toContain(
      'nesting',
    );
    expect(
      evaluateInput('wordCount', '"hello"', JSON.stringify(Array(9).fill(1)), 'en').error,
    ).toContain('8 parameters');
  });
  it('does not resolve prototype names as adapter functions', () => {
    expect(evaluateInput('__proto__', '"text"', '[]', 'en').error).toContain('No playground');
    expect(evaluateInput('constructor', '"text"', '[]', 'en').error).toContain('No playground');
  });
});
