export const PIPE_ALIASES = [
  {
    selector: 'localized',
    className: 'LocalizedLegacyPipe',
    target: 'localizedDate',
    deprecated: true,
  },
  {
    selector: 'fileSize',
    className: 'FileSizeAliasPipe',
    target: 'filesize',
    deprecated: false,
  },
  {
    selector: 'roundHalfUp',
    className: 'RoundHalfUpPipe',
    target: 'roundHalf',
    deprecated: false,
  },
  {
    selector: 'camelCaseToTitleSeparatedCase',
    className: 'CamelCaseToTitleSeparatedCasePipe',
    target: 'camelCaseToTitleSeperatedCase',
    deprecated: false,
  },
] as const;
