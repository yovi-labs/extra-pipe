import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  AverageByPipe,
  BasisPointsPipe,
  BusinessDaysDifferencePipe,
  CalendarDayDifferencePipe,
  ChunkPipe,
  ClampPipe,
  CompactPipe,
  CountByPipe,
  CumulativeSumPipe,
  DateBucketPipe,
  DatePartsPipe,
  DateSequencePipe,
  DefaultsPipe,
  DifferenceByPipe,
  EscapeRegExpPipe,
  ExcerptPipe,
  ExtentByPipe,
  FilterByPipe,
  FlattenPipe,
  FormatFractionPipe,
  GetPathPipe,
  GraphemeCountPipe,
  HighlightMatchesPipe,
  HistogramPipe,
  HumanizeIdentifierPipe,
  IndexByPipe,
  IntersectionByPipe,
  InvertRecordPipe,
  IsWithinIntervalPipe,
  IsoWeekPipe,
  MaxByPipe,
  MergeByPipe,
  MinByPipe,
  MovingAveragePipe,
  NormalizeWhitespacePipe,
  NumberBasePipe,
  OmitPipe,
  OverlapDurationPipe,
  PaginatePipe,
  PartitionPipe,
  PathEntriesPipe,
  PercentageChangePipe,
  PercentileByPipe,
  PickPipe,
  PluckPipe,
  PluralCategoryPipe,
  PruneEmptyPipe,
  QuarterPipe,
  RatioPipe,
  ReadingTimePipe,
  RenameKeysPipe,
  RoundToPipe,
  RoundToStepPipe,
  SlidingWindowPipe,
  SplitLinesPipe,
  StripDiacriticsPipe,
  SumByPipe,
  SummarizeByPipe,
  SymmetricDifferenceByPipe,
  TruncateWordsPipe,
  UnionByPipe,
  UnixTimestampPipe,
  UnzipPipe,
  WeightedAverageByPipe,
  WordCountPipe,
  WrapWordsPipe,
  ZipPipe,
} from 'extra-pipe';
@Component({
  standalone: true,
  selector: 'app-expansion',
  imports: [
    JsonPipe,
    KeyValuePipe,
    WordCountPipe,
    TruncateWordsPipe,
    WrapWordsPipe,
    ReadingTimePipe,
    NormalizeWhitespacePipe,
    StripDiacriticsPipe,
    ExcerptPipe,
    HighlightMatchesPipe,
    HumanizeIdentifierPipe,
    EscapeRegExpPipe,
    GraphemeCountPipe,
    SplitLinesPipe,
    ChunkPipe,
    FlattenPipe,
    CompactPipe,
    PartitionPipe,
    ZipPipe,
    UnzipPipe,
    SlidingWindowPipe,
    PluckPipe,
    FilterByPipe,
    IntersectionByPipe,
    DifferenceByPipe,
    UnionByPipe,
    SymmetricDifferenceByPipe,
    IndexByPipe,
    CountByPipe,
    MergeByPipe,
    PaginatePipe,
    GetPathPipe,
    PickPipe,
    OmitPipe,
    RenameKeysPipe,
    DefaultsPipe,
    InvertRecordPipe,
    PruneEmptyPipe,
    PathEntriesPipe,
    SumByPipe,
    AverageByPipe,
    MinByPipe,
    MaxByPipe,
    SummarizeByPipe,
    PercentileByPipe,
    WeightedAverageByPipe,
    ExtentByPipe,
    CumulativeSumPipe,
    MovingAveragePipe,
    HistogramPipe,
    PercentageChangePipe,
    ClampPipe,
    RoundToPipe,
    RoundToStepPipe,
    RatioPipe,
    PluralCategoryPipe,
    FormatFractionPipe,
    BasisPointsPipe,
    NumberBasePipe,
    DatePartsPipe,
    CalendarDayDifferencePipe,
    IsWithinIntervalPipe,
    OverlapDurationPipe,
    IsoWeekPipe,
    QuarterPipe,
    UnixTimestampPipe,
    DateBucketPipe,
    BusinessDaysDifferencePipe,
    DateSequencePipe,
  ],
  template: `
    {{ input0 | wordCount }}
    {{ input1 | truncateWords: 2 }}
    {{ input2 | wrapWords: 7 }}
    {{ input3 | readingTime: 200 }}
    {{ input4 | normalizeWhitespace }}
    {{ input5 | stripDiacritics }}
    {{ input6 | excerpt: 'two' : 12 }}
    {{ input7 | highlightMatches: 'Ana' | json }}
    {{ input8 | humanizeIdentifier }}
    {{ input9 | escapeRegExp }}
    {{ input10 | graphemeCount }}
    {{ input11 | splitLines | json }}
    {{ input12 | chunk: 2 | json }}
    {{ input13 | flatten: 2 | json }}
    {{ input14 | compact | json }}
    {{ input15 | partition: 'active' : true | json }}
    {{ input16 | zip: ['A', 'B'] | json }}
    {{ input17 | unzip | json }}
    {{ input18 | slidingWindow: 2 | json }}
    {{ input19 | pluck: 'id' | json }}
    {{ input20 | filterBy: 'active' : true | json }}
    {{ input21 | intersectionBy: [{ id: 2 }] : 'id' | json }}
    {{ input22 | differenceBy: [{ id: 2 }] : 'id' | json }}
    {{ input23 | unionBy: [{ id: 1 }, { id: 2 }] : 'id' | json }}
    {{ input24 | symmetricDifferenceBy: [{ id: 2 }, { id: 3 }] : 'id' | json }}
    {{ input25 | indexBy: 'id' | keyvalue: keepInsertionOrder | json }}
    {{ input26 | countBy: 'team' | json }}
    {{ input27 | mergeBy: [{ id: 1, active: true }] : 'id' | json }}
    {{ input28 | paginate: 1 : 2 | json }}
    {{ input29 | getPath: ['profile', 'name'] }}
    {{ input30 | pick: ['name'] | json }}
    {{ input31 | omit: ['id'] | json }}
    {{ input32 | renameKeys: { first_name: 'name' } | json }}
    {{ input33 | defaults: { name: 'Ana', active: true } | json }}
    {{ input34 | invertRecord | json }}
    {{ input35 | pruneEmpty | json }}
    {{ input36 | pathEntries | json }}
    {{ input37 | sumBy: 'amount' }}
    {{ input38 | averageBy: 'amount' }}
    {{ input39 | minBy: 'amount' | json }}
    {{ input40 | maxBy: 'amount' | json }}
    {{ input41 | summarizeBy: 'amount' | json }}
    {{ input42 | percentileBy: 'amount' : 50 }}
    {{ input43 | weightedAverageBy: 'value' : 'weight' }}
    {{ input44 | extentBy: 'amount' | json }}
    {{ input45 | cumulativeSum | json }}
    {{ input46 | movingAverage: 2 | json }}
    {{ input47 | histogram: 2 | json }}
    {{ input48 | percentageChange: 100 }}
    {{ input49 | clamp: 0 : 100 }}
    {{ input50 | roundTo: 2 }}
    {{ input51 | roundToStep: 0.5 }}
    {{ input52 | ratio: 2 }}
    {{ input53 | pluralCategory: 'cardinal' }}
    {{ input54 | formatFraction: 100 }}
    {{ input55 | basisPoints }}
    {{ input56 | numberBase: 16 }}
    {{ input57 | dateParts: 'UTC' | json }}
    {{ input58 | calendarDayDifference: '2026-01-02T01:00:00Z' }}
    {{
      input59
        | isWithinInterval: '2026-01-01T00:00:00Z' : '2026-01-03T00:00:00Z'
    }}
    {{
      input60
        | overlapDuration
          : '2026-01-01T02:00:00Z'
          : '2026-01-01T01:00:00Z'
          : '2026-01-01T03:00:00Z'
    }}
    {{ input61 | isoWeek | json }}
    {{ input62 | quarter }}
    {{ input63 | unixTimestamp }}
    {{ input64 | dateBucket: 'month' }}
    {{ input65 | businessDaysDifference: '2026-01-05T00:00:00Z' }}
    {{ input66 | dateSequence: '2026-01-03T00:00:00Z' : 1 | json }}
  `,
})
export class ExpansionComponent {
  readonly keepInsertionOrder = () => 0;
  readonly input0 = 'Hello world';
  readonly input1 = 'Hello brave world';
  readonly input2 = 'one two three';
  readonly input3 = 'one two three';
  readonly input4 = '  Ana\t  Sam \n';
  readonly input5 = 'Café عربي';
  readonly input6 = 'zero one two three';
  readonly input7 = 'Ana and Ana';
  readonly input8 = 'XMLHttpRequest_id';
  readonly input9 = 'a+b?';
  readonly input10 = '👩🏽‍💻é';
  readonly input11 = 'one\r\ntwo\n';
  readonly input12 = [1, 2, 3];
  readonly input13 = [1, [2, [3]]];
  readonly input14 = [0, null, false, ''];
  readonly input15 = [{ active: true }, { active: false }];
  readonly input16 = [1, 2];
  readonly input17 = [
    [1, 'A'],
    [2, 'B'],
  ] as const;
  readonly input18 = [1, 2, 3];
  readonly input19 = [{ id: 1 }, { id: 2 }];
  readonly input20 = [{ active: true }, { active: false }];
  readonly input21 = [{ id: 1 }, { id: 2 }];
  readonly input22 = [{ id: 1 }, { id: 2 }];
  readonly input23 = [{ id: 1 }];
  readonly input24 = [{ id: 1 }, { id: 2 }];
  readonly input25 = [
    { id: 1, name: 'Ana' },
    { id: 2, name: 'Sam' },
  ];
  readonly input26 = [{ team: 'A' }, { team: 'A' }, { team: 'B' }];
  readonly input27 = [{ id: 1, name: 'Ana' }];
  readonly input28 = [1, 2, 3];
  readonly input29 = { profile: { name: 'Ana' } };
  readonly input30 = { id: 1, name: 'Ana' };
  readonly input31 = { id: 1, name: 'Ana' };
  readonly input32 = { first_name: 'Ana' };
  readonly input33 = { name: null, active: false };
  readonly input34 = { a: 'x', b: 'x' };
  readonly input35 = { a: '', b: 0, c: false, d: { e: null } };
  readonly input36 = { profile: { name: 'Ana' } };
  readonly input37 = [{ amount: 2 }, { amount: 4 }];
  readonly input38 = [{ amount: 2 }, { amount: 4 }];
  readonly input39 = [{ amount: 2 }, { amount: 4 }];
  readonly input40 = [{ amount: 2 }, { amount: 4 }];
  readonly input41 = [{ amount: 2 }, { amount: 4 }];
  readonly input42 = [{ amount: 2 }, { amount: 4 }];
  readonly input43 = [
    { value: 2, weight: 1 },
    { value: 4, weight: 3 },
  ];
  readonly input44 = [{ amount: 2 }, { amount: 4 }];
  readonly input45 = [1, 2, 3];
  readonly input46 = [1, 2, 3];
  readonly input47 = [0, 1, 2, 3];
  readonly input48 = 120;
  readonly input49 = 120;
  readonly input50 = 12.345;
  readonly input51 = 7.6;
  readonly input52 = 3;
  readonly input53 = 2;
  readonly input54 = 1.5;
  readonly input55 = 0.0125;
  readonly input56 = 255;
  readonly input57 = '2026-01-02T12:00:00Z';
  readonly input58 = '2026-01-01T23:00:00Z';
  readonly input59 = '2026-01-02T00:00:00Z';
  readonly input60 = '2026-01-01T00:00:00Z';
  readonly input61 = '2026-01-01T00:00:00Z';
  readonly input62 = '2026-05-01T00:00:00Z';
  readonly input63 = '1970-01-01T00:00:01Z';
  readonly input64 = '2026-05-15T12:30:00Z';
  readonly input65 = '2026-01-02T00:00:00Z';
  readonly input66 = '2026-01-01T00:00:00Z';
}
