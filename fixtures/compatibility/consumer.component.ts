import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  ByteSizePipe, DateRangePipe, DisplayNamePipe, FormatUnitPipe, GroupByPipe,
  ListFormatPipe, NumberRangePipe, OrderByPipe, SlugifyPipe, TruncateMiddlePipe,
  UniqueByPipe, CompactNumberPipe, FormatDurationPipe, InitialsPipe, MaskPipe,
  RelativeTimePipe, TruncatePipe, LocalizedLegacyPipe, FileSizeAliasPipe,
  RoundHalfUpPipe, CamelCaseToTitleSeparatedCasePipe,
} from 'extra-pipe';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [JsonPipe, ByteSizePipe, DateRangePipe, DisplayNamePipe, FormatUnitPipe,
    GroupByPipe, ListFormatPipe, NumberRangePipe, OrderByPipe, SlugifyPipe,
    TruncateMiddlePipe, UniqueByPipe, CompactNumberPipe, FormatDurationPipe,
    InitialsPipe, MaskPipe, RelativeTimePipe, TruncatePipe, LocalizedLegacyPipe,
    FileSizeAliasPipe, RoundHalfUpPipe, CamelCaseToTitleSeparatedCasePipe],
  template: `
    {{ 1024 | byteSize: { base: 1024 }: 'fr-FR' }}
    {{ start | dateRange: end: { timeZone: 'UTC' }: 'en-US' }}
    {{ 'FR' | displayName: 'region': {}: 'fr-FR' }}
    {{ 10 | formatUnit: 'meter': {}: 'ar-MA' }}
    {{ items | groupBy: 'team' | json }}
    {{ names | listFormat: {}: 'en-US' }}
    {{ 10 | numberRange: 20: {}: 'fr-FR' }}
    {{ items | orderBy: 'id': 'desc': 'en-US' | json }}
    {{ 'Développeur عربي' | slugify: { foldLatinAccents: true } }}
    {{ '👩🏽‍💻 long-file-name.ts' | truncateMiddle: 10 }}
    {{ items | uniqueBy: 'id': 'last' | json }}
    {{ 12500 | compactNumber }}
    {{ 90 | formatDuration: 'seconds' }}
    {{ 'Ána María' | initials }}
    {{ '4242424242424242' | mask: 0: 4 }}
    {{ start | relativeTime: end }}
    {{ '👩🏽‍💻 developer tools' | truncate: 12 }}
    {{ start | localized }}
    {{ 1024 | fileSize }}
    {{ 2.455 | roundHalfUp }}
    {{ 'extraPipe' | camelCaseToTitleSeparatedCase }}
  `,
})
export class CompatibilityComponent {
  readonly start = new Date('2024-01-01T00:00:00Z');
  readonly end = new Date('2024-01-02T00:00:00Z');
  readonly names = ['Angular', 'Extra Pipe'];
  readonly items = [{id:2,team:'A'}, {id:1,team:'B'}, {id:2,team:'B'}];
}
