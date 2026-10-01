export interface MatchSegment {
  readonly text: string;
  readonly matched: boolean;
}
export interface PartitionResult<T> {
  readonly matching: T[];
  readonly remaining: T[];
}
export interface PageResult<T> {
  readonly items: T[];
  readonly page: number;
  readonly pageSize: number;
  readonly totalItems: number;
  readonly totalPages: number;
}
export interface CountGroup<K> {
  readonly key: K;
  readonly count: number;
}
export interface NumericSummary {
  readonly count: number;
  readonly sum: number;
  readonly mean: number;
  readonly min: number;
  readonly max: number;
}
export interface HistogramBin {
  readonly lower: number;
  readonly upper: number;
  readonly count: number;
}
export interface PathEntry {
  readonly path: PropertyKey[];
  readonly value: unknown;
}
export interface IsoWeekResult {
  readonly year: number;
  readonly week: number;
}
export type DateBucketUnit = 'day' | 'week' | 'month' | 'quarter' | 'year';
export type PluralKind = 'cardinal' | 'ordinal';
