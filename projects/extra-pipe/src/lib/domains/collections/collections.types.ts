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
