import type { PlaygroundSample } from './pipe-runner';
export const EXPANDED_SAMPLES: Readonly<Record<string, PlaygroundSample>> = {
  wordCount: {
    input: 'Hello world',
    parameters: [],
  },
  truncateWords: {
    input: 'Hello brave world',
    parameters: [2],
  },
  wrapWords: {
    input: 'one two three',
    parameters: [7],
  },
  readingTime: {
    input: 'one two three',
    parameters: [200],
  },
  normalizeWhitespace: {
    input: '  Ana\t  Sam \n',
    parameters: [],
  },
  stripDiacritics: {
    input: 'Café عربي',
    parameters: [],
  },
  excerpt: {
    input: 'zero one two three',
    parameters: ['two', 12],
  },
  highlightMatches: {
    input: 'Ana and Ana',
    parameters: ['Ana'],
  },
  humanizeIdentifier: {
    input: 'XMLHttpRequest_id',
    parameters: [],
  },
  escapeRegExp: {
    input: 'a+b?',
    parameters: [],
  },
  graphemeCount: {
    input: '👩🏽‍💻é',
    parameters: [],
  },
  splitLines: {
    input: 'one\r\ntwo\n',
    parameters: [],
  },
  chunk: {
    input: [1, 2, 3],
    parameters: [2],
  },
  flatten: {
    input: [1, [2, [3]]],
    parameters: [2],
  },
  compact: {
    input: [0, null, false, ''],
    parameters: [],
  },
  partition: {
    input: [
      {
        active: true,
      },
      {
        active: false,
      },
    ],
    parameters: ['active', true],
  },
  zip: {
    input: [1, 2],
    parameters: [['A', 'B']],
  },
  unzip: {
    input: [
      [1, 'A'],
      [2, 'B'],
    ],
    parameters: [],
  },
  slidingWindow: {
    input: [1, 2, 3],
    parameters: [2],
  },
  pluck: {
    input: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    parameters: ['id'],
  },
  filterBy: {
    input: [
      {
        active: true,
      },
      {
        active: false,
      },
    ],
    parameters: ['active', true],
  },
  intersectionBy: {
    input: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    parameters: [
      [
        {
          id: 2,
        },
      ],
      'id',
    ],
  },
  differenceBy: {
    input: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    parameters: [
      [
        {
          id: 2,
        },
      ],
      'id',
    ],
  },
  unionBy: {
    input: [
      {
        id: 1,
      },
    ],
    parameters: [
      [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
      'id',
    ],
  },
  symmetricDifferenceBy: {
    input: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    parameters: [
      [
        {
          id: 2,
        },
        {
          id: 3,
        },
      ],
      'id',
    ],
  },
  indexBy: {
    input: [
      {
        id: 1,
        name: 'Ana',
      },
      {
        id: 2,
        name: 'Sam',
      },
    ],
    parameters: ['id'],
  },
  countBy: {
    input: [
      {
        team: 'A',
      },
      {
        team: 'A',
      },
      {
        team: 'B',
      },
    ],
    parameters: ['team'],
  },
  mergeBy: {
    input: [
      {
        id: 1,
        name: 'Ana',
      },
    ],
    parameters: [
      [
        {
          id: 1,
          active: true,
        },
      ],
      'id',
    ],
  },
  paginate: {
    input: [1, 2, 3],
    parameters: [1, 2],
  },
  getPath: {
    input: {
      profile: {
        name: 'Ana',
      },
    },
    parameters: [['profile', 'name']],
  },
  pick: {
    input: {
      id: 1,
      name: 'Ana',
    },
    parameters: [['name']],
  },
  omit: {
    input: {
      id: 1,
      name: 'Ana',
    },
    parameters: [['id']],
  },
  renameKeys: {
    input: {
      first_name: 'Ana',
    },
    parameters: [
      {
        first_name: 'name',
      },
    ],
  },
  defaults: {
    input: {
      name: null,
      active: false,
    },
    parameters: [
      {
        name: 'Ana',
        active: true,
      },
    ],
  },
  invertRecord: {
    input: {
      a: 'x',
      b: 'x',
    },
    parameters: [],
  },
  pruneEmpty: {
    input: {
      a: '',
      b: 0,
      c: false,
      d: {
        e: null,
      },
    },
    parameters: [],
  },
  pathEntries: {
    input: {
      profile: {
        name: 'Ana',
      },
    },
    parameters: [],
  },
  sumBy: {
    input: [
      {
        amount: 2,
      },
      {
        amount: 4,
      },
    ],
    parameters: ['amount'],
  },
  averageBy: {
    input: [
      {
        amount: 2,
      },
      {
        amount: 4,
      },
    ],
    parameters: ['amount'],
  },
  minBy: {
    input: [
      {
        amount: 2,
      },
      {
        amount: 4,
      },
    ],
    parameters: ['amount'],
  },
  maxBy: {
    input: [
      {
        amount: 2,
      },
      {
        amount: 4,
      },
    ],
    parameters: ['amount'],
  },
  summarizeBy: {
    input: [
      {
        amount: 2,
      },
      {
        amount: 4,
      },
    ],
    parameters: ['amount'],
  },
  percentileBy: {
    input: [
      {
        amount: 2,
      },
      {
        amount: 4,
      },
    ],
    parameters: ['amount', 50],
  },
  weightedAverageBy: {
    input: [
      {
        value: 2,
        weight: 1,
      },
      {
        value: 4,
        weight: 3,
      },
    ],
    parameters: ['value', 'weight'],
  },
  extentBy: {
    input: [
      {
        amount: 2,
      },
      {
        amount: 4,
      },
    ],
    parameters: ['amount'],
  },
  cumulativeSum: {
    input: [1, 2, 3],
    parameters: [],
  },
  movingAverage: {
    input: [1, 2, 3],
    parameters: [2],
  },
  histogram: {
    input: [0, 1, 2, 3],
    parameters: [2],
  },
  percentageChange: {
    input: 120,
    parameters: [100],
  },
  clamp: {
    input: 120,
    parameters: [0, 100],
  },
  roundTo: {
    input: 12.345,
    parameters: [2],
  },
  roundToStep: {
    input: 7.6,
    parameters: [0.5],
  },
  ratio: {
    input: 3,
    parameters: [2],
  },
  pluralCategory: {
    input: 2,
    parameters: ['cardinal'],
  },
  formatFraction: {
    input: 1.5,
    parameters: [100],
  },
  basisPoints: {
    input: 0.0125,
    parameters: [],
  },
  numberBase: {
    input: 255,
    parameters: [16],
  },
  dateParts: {
    input: '2026-01-02T12:00:00Z',
    parameters: ['UTC'],
  },
  calendarDayDifference: {
    input: '2026-01-01T23:00:00Z',
    parameters: ['2026-01-02T01:00:00Z'],
  },
  isWithinInterval: {
    input: '2026-01-02T00:00:00Z',
    parameters: ['2026-01-01T00:00:00Z', '2026-01-03T00:00:00Z'],
  },
  overlapDuration: {
    input: '2026-01-01T00:00:00Z',
    parameters: ['2026-01-01T02:00:00Z', '2026-01-01T01:00:00Z', '2026-01-01T03:00:00Z'],
  },
  isoWeek: {
    input: '2026-01-01T00:00:00Z',
    parameters: [],
  },
  quarter: {
    input: '2026-05-01T00:00:00Z',
    parameters: [],
  },
  unixTimestamp: {
    input: '1970-01-01T00:00:01Z',
    parameters: [],
  },
  dateBucket: {
    input: '2026-05-15T12:30:00Z',
    parameters: ['month'],
  },
  businessDaysDifference: {
    input: '2026-01-02T00:00:00Z',
    parameters: ['2026-01-05T00:00:00Z'],
  },
  dateSequence: {
    input: '2026-01-01T00:00:00Z',
    parameters: ['2026-01-03T00:00:00Z', 1],
  },
};
export const EXPANDED_LOCALE_INDEXES: Readonly<Partial<Record<string, number>>> = {
  wordCount: 0,
  truncateWords: 2,
  readingTime: 1,
  pluralCategory: 1,
  formatFraction: 1,
  basisPoints: 1,
  dateParts: 1,
};
