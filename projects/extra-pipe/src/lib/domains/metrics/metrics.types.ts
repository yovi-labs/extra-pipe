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
