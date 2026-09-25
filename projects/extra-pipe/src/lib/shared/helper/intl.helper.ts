export type DateInput = Date | number | string;

/**
 * Returns a locale accepted by the Intl API, falling back to the application's
 * configured locale when a caller supplies an invalid value.
 */
export function resolveLocale(locale: unknown, fallbackLocale: string): string {
  if (typeof locale !== 'string' || locale.trim() === '') {
    return fallbackLocale;
  }

  try {
    new Intl.NumberFormat(locale);
    return locale;
  } catch {
    return fallbackLocale;
  }
}

/** Converts supported date inputs to a valid Date without mutating Date input. */
export function toValidDate(value: unknown): Date | null {
  let date: Date;

  if (value instanceof Date) {
    date = new Date(value.getTime());
  } else if (typeof value === 'number') {
    if (!Number.isFinite(value)) return null;
    date = new Date(value);
  } else if (typeof value === 'string') {
    date = new Date(value);
  } else {
    return null;
  }

  return Number.isNaN(date.getTime()) ? null : date;
}

/** Splits text into user-perceived characters and falls back on code points. */
export function getGraphemes(value: string): string[] {
  if (typeof Intl.Segmenter === 'function') {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: 'grapheme',
    });
    return Array.from(segmenter.segment(value), item => item.segment);
  }

  return Array.from(value);
}

export function toNonNegativeInteger(value: number, fallback: number): number {
  return Number.isInteger(value) && value >= 0 ? value : fallback;
}
