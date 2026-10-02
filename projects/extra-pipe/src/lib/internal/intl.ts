import { graphemeSegments } from 'unicode-segmenter/grapheme';

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

interface GraphemeSegment {
  segment: string;
}

interface GraphemeSegmenter {
  segment(value: string): Iterable<GraphemeSegment>;
}

type GraphemeSegmenterConstructor = new (
  locales?: string | string[],
  options?: { granularity: 'grapheme' }
) => GraphemeSegmenter;

/** Splits user-perceived characters, including when Intl.Segmenter is absent. */
export function getGraphemes(value: string): string[] {
  // ng-packagr's Angular 17 compiler does not consistently include the
  // ES2022.Intl declarations, so describe this optional runtime API locally.
  const Segmenter = (
    Intl as typeof Intl & {
      Segmenter?: GraphemeSegmenterConstructor;
    }
  ).Segmenter;

  if (typeof Segmenter === 'function') {
    const segmenter = new Segmenter(undefined, {
      granularity: 'grapheme',
    });
    return Array.from(segmenter.segment(value), item => item.segment);
  }

  return Array.from(graphemeSegments(value), item => item.segment);
}

export function toNonNegativeInteger(value: number, fallback: number): number {
  return Number.isInteger(value) && value >= 0 ? value : fallback;
}
