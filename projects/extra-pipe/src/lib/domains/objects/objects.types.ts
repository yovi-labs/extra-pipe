export interface PathEntry {
  readonly path: PropertyKey[];
  readonly value: unknown;
}
/** Only enumerable own data fields are emitted; structural type keys may be absent. */
export type DefaultsResult<T, U> = Partial<{
  readonly [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? Exclude<T[K], null | undefined> | U[K]
      : T[K]
    : K extends keyof U
      ? U[K]
      : never;
}>;
