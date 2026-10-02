import type { PipeExample } from '../pipe-example.model';

export const DISPLAY_EXAMPLES = [
  {
    selector: 'base64ImageUrl',
    className: 'Base64ImageUrlPipe',
    category: 'Utilities',
    description: 'Build a data URL from raw base64.',
    example: "{{ 'SGVsbG8=' | base64ImageUrl: 'image/png' }}",
    output: 'data:image/png;base64,SGVsbG8=',
    contract:
      'String base64 and nonempty MIME string. Does not validate image bytes or sanitize content; only use trusted image data.',
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
    sample: {
      input: 'SGVsbG8=',
      parameters: ['image/png'],
    },
    parameterNames: ['mimeType'],
  },
  {
    selector: 'listFormat',
    className: 'ListFormatPipe',
    category: 'Localization',
    description:
      'Formats readonly string lists using Intl conjunction, disjunction or unit grammar.',
    example:
      "{{ ['Angular', 'TypeScript', 'Extra Pipe'] | listFormat: {type: 'conjunction'}: 'fr' }}",
    output: 'Available in the 2.0 preview playground.',
    contract:
      "Formats readonly string lists using Intl conjunction, disjunction or unit grammar. Options: `type` and `style`. Rejects non-string members and invalid options with `''`; empty list returns `''`. Does not mutate input.",
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'preview',
    sample: {
      input: ['Angular', 'TypeScript', 'Extra Pipe'],
      parameters: [
        {
          type: 'conjunction',
          style: 'long',
        },
      ],
    },
    parameterNames: ['options'],
    localeParameterIndex: 1,
  },
  {
    selector: 'formatUnit',
    className: 'FormatUnitPipe',
    category: 'Numbers',
    description: 'Formats a finite number with a sanctioned Intl simple or compound unit.',
    example: "{{ 12.5 | formatUnit: 'kilometer': {unitDisplay: 'long'}: 'fr' }}",
    output: 'Available in the 2.0 preview playground.',
    contract:
      "Formats a finite number with a sanctioned Intl simple or compound unit. This is presentation, not unit conversion. Options exclude `style`/`unit`; they cannot override the chosen unit. Nullish numbers, unsupported units or invalid options return `''`.",
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'preview',
    sample: {
      input: 12.5,
      parameters: [
        'kilometer',
        {
          unitDisplay: 'long',
        },
      ],
    },
    parameterNames: ['unit', 'options'],
    localeParameterIndex: 2,
  },
  {
    selector: 'displayName',
    className: 'DisplayNamePipe',
    category: 'Localization',
    description:
      'Intl display names for language, region, script, currency, calendar or dateTimeField codes.',
    example: "{{ 'MA' | displayName: 'region': {}: 'ar' }}",
    output: 'Available in the 2.0 preview playground.',
    contract:
      "Intl display names for language, region, script, currency, calendar or dateTimeField codes. Options include style, fallback and languageDisplay. Default Intl fallback may return an unknown code; `fallback: 'none'` returns `''`. Malformed codes/options return `''`.",
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'preview',
    sample: {
      input: 'MA',
      parameters: ['region', {}],
    },
    parameterNames: ['type', 'options'],
    localeParameterIndex: 2,
  },
] as const satisfies readonly PipeExample[];
