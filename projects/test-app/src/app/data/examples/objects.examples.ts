import type { PipeExample } from '../pipe-example.model';

export const OBJECTS_EXAMPLES = [
  {
    selector: 'getPath',
    className: 'GetPathPipe',
    category: 'Utilities',
    description: 'Read an own-property path supplied as a key array.',
    example: '{{ {"profile":{"name":"Ana"}} | getPath: ["profile","name"] }}',
    output: 'Ana',
    contract:
      'Read an own-property path supplied as a key array. Signature: getPath(value: unknown, path: readonly PropertyKey[], fallback: unknown = null). Returns unknown. See the shared 101 contracts for bounds and invalid inputs. Key array up to 32 segments; own data only. Forbids __proto__, constructor and prototype. Missing paths use the fallback; an empty path returns the input. Apply JsonPipe yourself for object-valued leaves.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: false,
    keyValue: false,
    sample: {
      input: {
        profile: {
          name: 'Ana',
        },
      },
      parameters: [['profile', 'name']],
    },
    parameterNames: ['path', 'fallback'],
  },
  {
    selector: 'pick',
    className: 'PickPipe',
    category: 'Utilities',
    description: 'Display explicitly allowed own fields.',
    example: '{{ {"id":1,"name":"Ana"} | pick: ["name"] }}',
    output: '{"name":"Ana"}',
    contract:
      'Display explicitly allowed own fields. Signature: pick(value: T | null | undefined, keys: readonly (keyof T & string)[]). Returns Partial<T> | null. See the shared 101 contracts for bounds and invalid inputs. Plain records and string keys only; copies selected enumerable own data fields without traversing paths.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: {
        id: 1,
        name: 'Ana',
      },
      parameters: [['name']],
    },
    parameterNames: ['keys'],
  },
  {
    selector: 'omit',
    className: 'OmitPipe',
    category: 'Utilities',
    description: 'Create a display object excluding named own fields.',
    example: '{{ {"id":1,"name":"Ana"} | omit: ["id"] }}',
    output: '{"name":"Ana"}',
    contract:
      'Create a display object excluding named own fields. Signature: omit(value: T | null | undefined, keys: readonly (keyof T & string)[]). Returns Partial<T> | null. See the shared 101 contracts for bounds and invalid inputs. Plain records and string keys only; excludes listed enumerable own data fields without traversing paths.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: {
        id: 1,
        name: 'Ana',
      },
      parameters: [['id']],
    },
    parameterNames: ['keys'],
  },
  {
    selector: 'renameKeys',
    className: 'RenameKeysPipe',
    category: 'Utilities',
    description: 'Remap schema field names without silently losing collisions.',
    example: '{{ {"first_name":"Ana"} | renameKeys: {"first_name":"name"} }}',
    output: '{"name":"Ana"}',
    contract:
      'Remap schema field names without silently losing collisions. Signature: renameKeys(value: Readonly<Record<string, unknown>> | null | undefined, mapping: Readonly<Record<string, string>>). Returns Record<string,unknown> | null. See the shared 101 contracts for bounds and invalid inputs. Shallow own-string-key mapping. Colliding targets or non-string mappings reject the input; output keys are prototype-safe data.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: {
        first_name: 'Ana',
      },
      parameters: [
        {
          first_name: 'name',
        },
      ],
    },
    parameterNames: ['mapping'],
  },
  {
    selector: 'defaults',
    className: 'DefaultsPipe',
    category: 'Utilities',
    description: 'Fill only nullish own fields from shallow defaults.',
    example: '{{ {"name":null,"active":false} | defaults: {"name":"Ana","active":true} }}',
    output: '{"name":"Ana","active":false}',
    contract:
      'Fill only nullish own fields from shallow defaults. Signature: defaults(value: T | null | undefined, fallback: U). Returns DefaultsResult<T, U> | null. See the shared 101 contracts for bounds and invalid inputs. Shallow fallback only for absent/null/undefined fields; preserves 0, false and empty text. Copies enumerable own data fields; result type permits absent structural keys.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
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
    parameterNames: ['fallback'],
  },
  {
    selector: 'invertRecord',
    className: 'InvertRecordPipe',
    category: 'Utilities',
    description: 'Invert scalar mappings while preserving duplicate-value keys.',
    example: '{{ {"a":"x","b":"x"} | invertRecord }}',
    output: '{"x":["a","b"]}',
    contract:
      'Invert scalar mappings while preserving duplicate-value keys. Signature: invertRecord(value: Readonly<Record<string, string | number | boolean>> | null | undefined). Returns Record<string,string[]> | null. See the shared 101 contracts for bounds and invalid inputs. Finite number, string or boolean values become string keys; duplicate values collect original field names in encounter order.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: {
        a: 'x',
        b: 'x',
      },
      parameters: [],
    },
    parameterNames: [],
  },
  {
    selector: 'pruneEmpty',
    className: 'PruneEmptyPipe',
    category: 'Utilities',
    description: 'Remove recursively empty data while preserving zero and false.',
    example: '{{ {"a":"","b":0,"c":false,"d":{"e":null}} | pruneEmpty }}',
    output: '{"b":0,"c":false}',
    contract:
      'Remove recursively empty data while preserving zero and false. Signature: pruneEmpty(value: Readonly<Record<string,unknown>> | null | undefined). Returns Record<string,unknown> | null. See the shared 101 contracts for bounds and invalid inputs. Recursively removes null/undefined/empty text and empty containers, keeping 0/false. Depth 12, cycles reject input. Other leaf objects retain identity.',
    invalid: 'null',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
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
    parameterNames: [],
  },
  {
    selector: 'pathEntries',
    className: 'PathEntriesPipe',
    category: 'Utilities',
    description: 'Flatten own leaf values to key-array paths, without dotted-key ambiguity.',
    example: '{{ {"profile":{"name":"Ana"}} | pathEntries }}',
    output: '[{"path":["profile","name"],"value":"Ana"}]',
    contract:
      'Flatten own leaf values to key-array paths, without dotted-key ambiguity. Signature: pathEntries(value: Readonly<Record<string,unknown>> | null | undefined). Returns PathEntry[]. See the shared 101 contracts for bounds and invalid inputs. Plain-record root, nested plain records/arrays, enumerable own data fields. Key-array paths preserve literal dots; depth 12/cycles are rejected. Empty containers are leaves.',
    invalid: '[]',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    json: true,
    keyValue: false,
    sample: {
      input: {
        profile: {
          name: 'Ana',
        },
      },
      parameters: [],
    },
    parameterNames: [],
  },
] as const satisfies readonly PipeExample[];
