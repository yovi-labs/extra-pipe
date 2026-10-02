import type { PipeExample } from '../pipe-example.model';

export const COLLECTIONS_EXAMPLES = [
  {
    selector: 'chunk',
    className: 'ChunkPipe',
    category: 'Collections',
    description: 'Group cards into fixed-size display rows.',
    example: '{{ [1,2,3] | chunk: 2 }}',
    output: '[[1,2],[3]]',
    contract:
      'Group cards into fixed-size display rows. Signature: chunk(value: readonly T[] | null | undefined, size = 2). Returns T[][]. See the shared 101 contracts for bounds and invalid inputs. Size 1–5,000; retains the final partial chunk and source item identity.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [1, 2, 3],
      parameters: [2],
    },
    parameterNames: ['size'],
  },
  {
    selector: 'flatten',
    className: 'FlattenPipe',
    category: 'Collections',
    description: 'Present nested lists with explicit bounded depth.',
    example: '{{ [1,[2,[3]]] | flatten: 2 }}',
    output: '[1,2,3]',
    contract:
      'Present nested lists with explicit bounded depth. Signature: flatten(value: readonly unknown[] | null | undefined, depth = 1). Returns unknown[]. See the shared 101 contracts for bounds and invalid inputs. Depth 0–8; copies the outer array, preserves deeper arrays after the depth limit. Cycles encountered during traversal reject the input.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [1, [2, [3]]],
      parameters: [2],
    },
    parameterNames: ['depth'],
  },
  {
    selector: 'compact',
    className: 'CompactPipe',
    category: 'Collections',
    description: 'Drop nullish values while retaining 0 and false.',
    example: '{{ [0,null,false,""] | compact }}',
    output: '[0,false,""]',
    contract:
      'Drop nullish values while retaining 0 and false. Signature: compact(value: readonly T[] | null | undefined). Returns NonNullable<T>[]. See the shared 101 contracts for bounds and invalid inputs. Removes only null and undefined, preserving 0, false, empty text, order and item identity.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [0, null, false, ''],
      parameters: [],
    },
    parameterNames: [],
  },
  {
    selector: 'partition',
    className: 'PartitionPipe',
    category: 'Collections',
    description: 'Split records into matching and remaining buckets.',
    example: '{{ [{"active":true},{"active":false}] | partition: "active": true }}',
    output: '{"matching":[{"active":true}],"remaining":[{"active":false}]}',
    contract:
      'Split records into matching and remaining buckets. Signature: partition(value: readonly T[] | null | undefined, key: K, expected: T[K]). Returns PartitionResult<T>. See the shared 101 contracts for bounds and invalid inputs. Own data field, SameValueZero equality; missing/accessor fields read as undefined. Stable order in matching and remaining arrays.',
    invalid: '{"matching":[],"remaining":[]}',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
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
    parameterNames: ['key', 'expected'],
  },
  {
    selector: 'zip',
    className: 'ZipPipe',
    category: 'Collections',
    description: 'Pair parallel data series to the shorter length.',
    example: '{{ [1,2] | zip: ["A","B"] }}',
    output: '[[1,"A"],[2,"B"]]',
    contract:
      'Pair parallel data series to the shorter length. Signature: zip(value: readonly T[] | null | undefined, other: readonly U[]). Returns [T, U][]. See the shared 101 contracts for bounds and invalid inputs. Pairs by index up to the shorter array; preserves source item identity.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [1, 2],
      parameters: [['A', 'B']],
    },
    parameterNames: ['other'],
  },
  {
    selector: 'unzip',
    className: 'UnzipPipe',
    category: 'Collections',
    description: 'Split paired coordinates into parallel series.',
    example: '{{ pairs | unzip }}',
    output: '[[1,2],["A","B"]]',
    contract:
      'Split paired coordinates into parallel series. Signature: unzip(value: readonly (readonly [T, U])[] | null | undefined). Returns [T[], U[]]. See the shared 101 contracts for bounds and invalid inputs. Each input must be a two-element tuple; use readonly pairs declared with as const. Empty/invalid input returns two empty arrays.',
    invalid: '[[],[]]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [
        [1, 'A'],
        [2, 'B'],
      ],
      parameters: [],
    },
    parameterNames: [],
    componentContext: 'readonly pairs = [[1,"A"],[2,"B"]] as const;',
  },
  {
    selector: 'slidingWindow',
    className: 'SlidingWindowPipe',
    category: 'Collections',
    description: 'Create overlapping chart/history windows.',
    example: '{{ [1,2,3] | slidingWindow: 2 }}',
    output: '[[1,2],[2,3]]',
    contract:
      'Create overlapping chart/history windows. Signature: slidingWindow(value: readonly T[] | null | undefined, size = 2, step = 1). Returns T[][]. See the shared 101 contracts for bounds and invalid inputs. Full windows only; size and step 1–5,000. Work and output scale with window count times size.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [1, 2, 3],
      parameters: [2],
    },
    parameterNames: ['size', 'step'],
  },
  {
    selector: 'pluck',
    className: 'PluckPipe',
    category: 'Collections',
    description: 'Project own direct properties from record lists.',
    example: '{{ [{"id":1},{"id":2}] | pluck: "id" }}',
    output: '[1,2]',
    contract:
      'Project own direct properties from record lists. Signature: pluck(value: readonly T[] | null | undefined, key: K). Returns (T[K] | undefined)[]. See the shared 101 contracts for bounds and invalid inputs. Own data fields only; missing/accessor fields produce undefined (JSON displays these array entries as null).',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
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
    parameterNames: ['key'],
  },
  {
    selector: 'filterBy',
    className: 'FilterByPipe',
    category: 'Collections',
    description: 'Display records with an own property equal to a value.',
    example: '{{ [{"active":true},{"active":false}] | filterBy: "active": true }}',
    output: '[{"active":true}]',
    contract:
      'Display records with an own property equal to a value. Signature: filterBy(value: readonly T[] | null | undefined, key: K, expected: T[K]). Returns T[]. See the shared 101 contracts for bounds and invalid inputs. Own data fields with SameValueZero equality; missing/accessor fields read as undefined. Retains source order and identity.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
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
    parameterNames: ['key', 'expected'],
  },
  {
    selector: 'intersectionBy',
    className: 'IntersectionByPipe',
    category: 'Collections',
    description: 'Show records shared between selections by identity key.',
    example: '{{ [{"id":1},{"id":2}] | intersectionBy: [{"id":2}]: "id" }}',
    output: '[{"id":2}]',
    contract:
      'Show records shared between selections by identity key. Signature: intersectionBy(value: readonly T[] | null | undefined, other: readonly U[], key: K). Returns T[]. See the shared 101 contracts for bounds and invalid inputs. Distinct keys present on both sides; retains the first left record in left encounter order. Missing keys form one undefined identity.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
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
    parameterNames: ['other', 'key'],
  },
  {
    selector: 'differenceBy',
    className: 'DifferenceByPipe',
    category: 'Collections',
    description: 'Show unselected records by identity key.',
    example: '{{ [{"id":1},{"id":2}] | differenceBy: [{"id":2}]: "id" }}',
    output: '[{"id":1}]',
    contract:
      'Show unselected records by identity key. Signature: differenceBy(value: readonly T[] | null | undefined, other: readonly U[], key: K). Returns T[]. See the shared 101 contracts for bounds and invalid inputs. Distinct left-only keys; retains the first left record in encounter order. Missing keys form one undefined identity.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
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
    parameterNames: ['other', 'key'],
  },
  {
    selector: 'unionBy',
    className: 'UnionByPipe',
    category: 'Collections',
    description: 'Combine record sets with first-record precedence.',
    example: '{{ [{"id":1}] | unionBy: [{"id":1},{"id":2}]: "id" }}',
    output: '[{"id":1},{"id":2}]',
    contract:
      'Combine record sets with first-record precedence. Signature: unionBy(value: readonly T[] | null | undefined, other: readonly U[], key: K). Returns (T | U)[]. See the shared 101 contracts for bounds and invalid inputs. Distinct keys; first record wins, visiting left before right. Missing keys form one undefined identity.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
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
    parameterNames: ['other', 'key'],
  },
  {
    selector: 'symmetricDifferenceBy',
    className: 'SymmetricDifferenceByPipe',
    category: 'Collections',
    description: 'Show records exclusive to either selection.',
    example: '{{ [{"id":1},{"id":2}] | symmetricDifferenceBy: [{"id":2},{"id":3}]: "id" }}',
    output: '[{"id":1},{"id":3}]',
    contract:
      'Show records exclusive to either selection. Signature: symmetricDifferenceBy(value: readonly T[] | null | undefined, other: readonly U[], key: K). Returns (T | U)[]. See the shared 101 contracts for bounds and invalid inputs. Distinct keys found on one side only; left-only before right-only, first record wins. Missing keys form one undefined identity.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
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
    parameterNames: ['other', 'key'],
  },
  {
    selector: 'indexBy',
    className: 'IndexByPipe',
    category: 'Collections',
    description: 'Build a prototype-safe lookup Map from records.',
    example: '{{ [{"id":1,"name":"Ana"},{"id":2,"name":"Sam"}] | indexBy: "id" }}',
    output: '[[1,{"id":1,"name":"Ana"}],[2,{"id":2,"name":"Sam"}]]',
    contract:
      "Build a prototype-safe lookup Map from records. Signature: indexBy(value: readonly T[] | null | undefined, key: K). Returns Map<T[K] | undefined, T>. See the shared 101 contracts for bounds and invalid inputs. Map of own keys, last record wins without moving the key's encounter position. Missing keys use undefined. Use KeyValuePipe with a comparator returning zero and JsonPipe to preserve display order across Angular 17–22.",
    invalid: 'Empty Map (displayed as [] in the playground)',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: true,
    sample: {
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
    parameterNames: ['key'],
    componentContext: 'readonly keepInsertionOrder = () => 0;',
  },
  {
    selector: 'countBy',
    className: 'CountByPipe',
    category: 'Collections',
    description: 'Summarize category frequencies without retaining grouped arrays.',
    example: '{{ [{"team":"A"},{"team":"A"},{"team":"B"}] | countBy: "team" }}',
    output: '[{"key":"A","count":2},{"key":"B","count":1}]',
    contract:
      'Summarize category frequencies without retaining grouped arrays. Signature: countBy(value: readonly T[] | null | undefined, key: K). Returns CountGroup<T[K] | undefined>[]. See the shared 101 contracts for bounds and invalid inputs. Counts SameValueZero own-field groups in first-key encounter order. Missing keys use undefined.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
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
    parameterNames: ['key'],
  },
  {
    selector: 'mergeBy',
    className: 'MergeByPipe',
    category: 'Collections',
    description: 'Reconcile partial records with shallow last-field precedence.',
    example: '{{ [{"id":1,"name":"Ana"}] | mergeBy: [{"id":1,"active":true}]: "id" }}',
    output: '[{"id":1,"name":"Ana","active":true}]',
    contract:
      'Reconcile partial records with shallow last-field precedence. Signature: mergeBy(value: readonly T[] | null | undefined, other: readonly U[], key: K). Returns (T | U)[]. See the shared 101 contracts for bounds and invalid inputs. Shallow last-field-wins merge by own identity; first-key order, missing identities reject input. Unchanged source objects are not mutated.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
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
    parameterNames: ['other', 'key'],
  },
  {
    selector: 'paginate',
    className: 'PaginatePipe',
    category: 'Collections',
    description: 'Generate page items and total-page metadata for client display.',
    example: '{{ [1,2,3] | paginate: 1: 2 }}',
    output: '{"items":[1,2],"page":1,"pageSize":2,"totalItems":3,"totalPages":2}',
    contract:
      'Generate page items and total-page metadata for client display. Signature: paginate(value: readonly T[] | null | undefined, page = 1, pageSize = 20). Returns PageResult<T> | null. See the shared 101 contracts for bounds and invalid inputs. One-based page; size 1–5,000. Returns metadata plus a new items array; out-of-range pages have no items. Invalid input returns null.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: [1, 2, 3],
      parameters: [1, 2],
    },
    parameterNames: ['page', 'pageSize'],
  },
  {
    selector: 'includes',
    className: 'IncludesPipe',
    category: 'Collections',
    description: 'Membership checks, including falsy values.',
    example: '{{ [0, false] | includes: false }}',
    output: 'true',
    contract: 'Array and search value. Uses Array.includes SameValueZero semantics.',
    invalid: 'False for non-arrays',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    sample: {
      input: [0, false],
      parameters: [false],
    },
    parameterNames: ['candidate'],
  },
  {
    selector: 'removeByKey',
    className: 'RemoveByKeyPipe',
    category: 'Collections',
    description: 'Remove records matching excluded values.',
    example: "{{ items | removeByKey: 'id': [1, 2] }}",
    output: '[{"id":3,"name":"Item 3"}]',
    contract:
      'Object array, own data key and exclusion array. Fresh filtered array; inherited fields and getters are ignored. Replace array references to refresh.',
    invalid: 'Non-array/nullish input returned unchanged',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    sample: {
      input: [
        {
          id: 1,
          name: 'Item 1',
        },
        {
          id: 2,
          name: 'Item 2',
        },
        {
          id: 3,
          name: 'Item 3',
        },
      ],
      parameters: ['id', [1, 2]],
    },
    parameterNames: ['key', 'excluded'],
    componentContext: "items = [{id:1,name:'Item 1'},{id:2,name:'Item 2'},{id:3,name:'Item 3'}];",
  },
  {
    selector: 'removeDuplicatesByKey',
    className: 'RemoveDuplicatesByKeyPipe',
    category: 'Collections',
    description: 'Legacy last-wins deduplication.',
    example: "{{ itemsWithDuplication | removeDuplicatesByKey: 'name' }}",
    output: '[{"id":1,"name":"Item 1"},{"id":3,"name":"Item 3"}]',
    contract:
      'Object array and own data key. Last duplicate wins in first-key insertion order; getters and inherited fields are ignored. This differs from uniqueBy last retention order.',
    invalid: 'Non-array/nullish input returned unchanged',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    sample: {
      input: [
        {
          id: 1,
          name: 'Item 1',
        },
        {
          id: 2,
          name: 'Item 3',
        },
        {
          id: 3,
          name: 'Item 3',
        },
      ],
      parameters: ['name'],
    },
    parameterNames: ['key'],
    componentContext:
      "readonly itemsWithDuplication = [{id:1,name:'Item 1'},{id:2,name:'Item 3'},{id:3,name:'Item 3'}];",
  },
  {
    selector: 'groupBy',
    className: 'GroupByPipe',
    category: 'Collections',
    description: 'Readonly object arrays become ordered `{key, items}` groups.',
    example: "{{ items | groupBy: 'team' }}",
    output: 'Available in the 2.0 preview playground.',
    contract:
      'Readonly object arrays become ordered `{key, items}` groups. Encounter order and item identity are retained. Missing direct properties group under `undefined`. Map semantics make prototype-like keys safe. Invalid input returns `[]`.',
    invalid: 'Empty array',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    sample: {
      input: [
        {
          team: 'A',
          name: 'Ana',
        },
        {
          team: 'B',
          name: 'Sam',
        },
        {
          team: 'A',
          name: 'Lee',
        },
      ],
      parameters: ['team'],
    },
    parameterNames: ['key'],
    componentContext:
      "readonly items = [{team:'A',name:'Ana'},{team:'B',name:'Sam'},{team:'A',name:'Lee'}];",
  },
  {
    selector: 'uniqueBy',
    className: 'UniqueByPipe',
    category: 'Collections',
    description: 'Readonly object arrays; retain `first` by default or `last` explicitly.',
    example: "{{ items | uniqueBy: 'id': 'last' }}",
    output: 'Available in the 2.0 preview playground.',
    contract:
      'Readonly object arrays; retain `first` by default or `last` explicitly. Retained items remain in source order and keep identity. Direct property keys use Map equality. Invalid input returns `[]`. This is additive and does not change the legacy deduplicate pipe.',
    invalid: 'Empty array',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    sample: {
      input: [
        {
          id: 1,
          name: 'old',
        },
        {
          id: 2,
          name: 'two',
        },
        {
          id: 1,
          name: 'new',
        },
      ],
      parameters: ['id', 'last'],
    },
    parameterNames: ['key', 'retain'],
    componentContext: "readonly items = [{id:1,name:'old'},{id:2,name:'two'},{id:1,name:'new'}];",
  },
  {
    selector: 'orderBy',
    className: 'OrderByPipe',
    category: 'Collections',
    description: 'Readonly arrays; stable ascending/default or descending sort by a direct key.',
    example: "{{ items | orderBy: 'name': 'asc': 'fr' }}",
    output: 'Available in the 2.0 preview playground.',
    contract:
      'Readonly arrays; stable ascending/default or descending sort by a direct key. Finite numbers compare numerically, strings use numeric locale collation. Mixed numbers/strings form number-then-string type groups in ascending order (reversed for descending); missing/invalid keys are always last. Returns a new array retaining item identity.',
    invalid: 'Empty array',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'preview',
    sample: {
      input: [
        {
          name: 'Sam',
        },
        {
          name: 'Ana',
        },
        {
          name: 'Ana',
          id: 2,
        },
      ],
      parameters: ['name', 'asc'],
    },
    parameterNames: ['key', 'direction'],
    localeParameterIndex: 2,
    componentContext: "readonly items = [{name:'Sam'},{name:'Ana'}];",
  },
] as const satisfies readonly PipeExample[];
