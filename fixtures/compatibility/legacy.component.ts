import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  Base64ImageUrlPipe,
  CamelCaseToTitleSeparatedCasePipe,
  CamelToSnakePipe,
  CapitalizePipe,
  FileSizePipe,
  FormatDateTimePipe,
  HidePipe,
  IncludesPipe,
  LocalizedDatePipe,
  NumberToWordsPipe,
  RemoveByKeyPipe,
  RemoveDuplicatesByKeyPipe,
  ReplaceCommaPipe,
  RoundHalfPipe,
  SnakeToCamelPipe,
  UnderscoreToTitlePipe,
  UpperCaseFromPipe,
} from 'extra-pipe';
@Component({
  selector: 'app-legacy',
  standalone: true,
  imports: [
    JsonPipe,
    CamelToSnakePipe,
    CamelCaseToTitleSeparatedCasePipe,
    CapitalizePipe,
    FileSizePipe,
    FormatDateTimePipe,
    HidePipe,
    Base64ImageUrlPipe,
    IncludesPipe,
    LocalizedDatePipe,
    NumberToWordsPipe,
    RemoveByKeyPipe,
    RemoveDuplicatesByKeyPipe,
    ReplaceCommaPipe,
    RoundHalfPipe,
    SnakeToCamelPipe,
    UnderscoreToTitlePipe,
    UpperCaseFromPipe,
  ],
  template: `
    {{ 'extraPipe' | camelToSnake }}
    {{ 'extraPipe' | camelCaseToTitleSeparatedCase }}
    {{ 'angular' | capitalize }}
    {{ 1024 | fileSize }}
    {{ date | formatDateTime }}
    {{ 'text' | hide: true : '*' }}
    {{ 'SGVsbG8=' | base64ImageUrl: 'image/png' }}
    {{ items | includes: items[0] }}
    {{ date | localizedDate: 'fr' }}
    {{ 42 | numberToWords: 'en' }}
    {{ items | removeByKey: 'id' : [1] | json }}
    {{ items | removeDuplicatesByKey: 'id' | json }}
    {{ 'one,two' | replaceComma }}
    {{ 2.455 | roundHalf }}
    {{ 'extra_pipe' | snakeToCamel }}
    {{ 'extra_pipe' | underscoreToTitle }}
    {{ 'angular' | upperCaseFrom: 1 }}
  `,
})
export class LegacyComponent {
  readonly date = new Date('2026-01-01T12:00:00Z');
  readonly items = [{ id: 1 }, { id: 2 }, { id: 1 }];
}
