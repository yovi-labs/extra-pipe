import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Base64ImgUrlPipe,
  CamelCaseToTitleSeperatedCasePipe,
  CamelToSnakePipe,
  CapitalizePipe,
  CompactNumberPipe,
  FileSizePipe,
  FormatDurationPipe,
  FormatInstanceofDatePipe,
  HidePipe,
  IncludesPipe,
  InitialsPipe,
  LocalizedPipe,
  MaskPipe,
  NumberToWordsPipe,
  RelativeTimePipe,
  RemoveByKeyPipe,
  RemoveDuplicatesByKeyPipe,
  ReplaceCommaPipe,
  RoundHalfPipe,
  SnakeToCamelPipe,
  TruncatePipe,
  UnderscoreToTitlePipe,
  UpperCaseFromPipe,
} from 'extra-pipe';

@Component({
  standalone: true,
  selector: 'app-pipe-result',
  templateUrl: './pipe-result.component.html',
  styleUrls: ['./pipe-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CamelCaseToTitleSeperatedCasePipe,
    CapitalizePipe,
    CompactNumberPipe,
    FileSizePipe,
    FormatInstanceofDatePipe,
    FormatDurationPipe,
    HidePipe,
    InitialsPipe,
    Base64ImgUrlPipe,
    IncludesPipe,
    LocalizedPipe,
    MaskPipe,
    RelativeTimePipe,
    ReplaceCommaPipe,
    RemoveByKeyPipe,
    RoundHalfPipe,
    UnderscoreToTitlePipe,
    UpperCaseFromPipe,
    JsonPipe,
    RemoveDuplicatesByKeyPipe,
    NumberToWordsPipe,
    SnakeToCamelPipe,
    CamelToSnakePipe,
    TruncatePipe,
  ],
})
export class PipeResultComponent {
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  itemsWithDuplication = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 3' },
    { id: 3, name: 'Item 3' },
  ];
  date: Date = new Date('2022-11-12T12:00:00.000Z');
  readonly relativeReference = new Date('2024-01-01T12:00:00.000Z');
  readonly relativeValue = new Date('2024-01-01T12:03:00.000Z');
  readonly standaloneExample = [
    "import { CompactNumberPipe, TruncatePipe } from 'extra-pipe';",
    '',
    '@Component({',
    '  standalone: true,',
    '  imports: [CompactNumberPipe, TruncatePipe],',
    '})',
  ].join('\n');

  addItem(): void {
    this.items = [
      ...this.items,
      { id: this.items.length + 1, name: 'New item' },
    ];
  }
}
