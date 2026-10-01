import { resolveLocale } from '../../shared/helper/intl.helper';
import {
  finite,
  finiteResult,
  integer,
} from '../../shared/helper/toolbox.helper';
import { PluralKind } from './toolbox.types';

export function clamp(
  value: number | null | undefined,
  minimum: number,
  maximum: number
): number | null {
  return finite(value) &&
    finite(minimum) &&
    finite(maximum) &&
    minimum <= maximum
    ? Math.min(maximum, Math.max(minimum, value))
    : null;
}
function shift(value: number, precision: number): number {
  const [coefficient, exponent = '0'] = value.toString().split('e');
  return Number(coefficient + 'e' + (Number(exponent) + precision));
}
/** Decimal ties follow Math.round (toward positive infinity), not half-even. */
export function roundTo(
  value: number | null | undefined,
  precision = 0
): number | null {
  if (!finite(value) || !integer(precision, -12, 12)) return null;
  const shifted = shift(value, precision);
  if (!finite(shifted)) return null;
  return finiteResult(shift(Math.round(shifted), -precision));
}
export function roundToStep(
  value: number | null | undefined,
  step: number,
  origin = 0
): number | null {
  if (!finite(value) || !finite(step) || step <= 0 || !finite(origin))
    return null;
  const steps = (value - origin) / step;
  if (!finite(steps)) return null;
  const result = Math.round(steps) * step + origin;
  return finiteResult(result);
}
export function ratio(
  value: number | null | undefined,
  divisor: number
): number | null {
  return finite(value) && finite(divisor) && divisor !== 0
    ? finiteResult(value / divisor)
    : null;
}
export function pluralCategory(
  value: number | null | undefined,
  kind: PluralKind = 'cardinal',
  locale = 'en-US'
): string {
  if (!finite(value) || (kind !== 'cardinal' && kind !== 'ordinal')) return '';
  return new Intl.PluralRules(resolveLocale(locale, 'en-US'), {
    type: kind,
  }).select(value);
}
/** Smallest-error approximation; equal errors retain the smallest denominator. */
export function formatFraction(
  value: number | null | undefined,
  maximumDenominator = 100,
  locale = 'en-US'
): string {
  if (
    !finite(value) ||
    Math.abs(value) > Number.MAX_SAFE_INTEGER ||
    !integer(maximumDenominator, 1, 10000)
  )
    return '';
  const magnitude = Math.abs(value);
  let numerator = Math.round(magnitude),
    denominator = 1,
    error = Math.abs(magnitude - numerator);
  for (let d = 2; d <= maximumDenominator && error !== 0; d++) {
    const n = Math.round(magnitude * d);
    if (!Number.isSafeInteger(n)) break;
    const candidate = Math.abs(magnitude - n / d);
    if (candidate < error) {
      numerator = n;
      denominator = d;
      error = candidate;
    }
  }
  const format = new Intl.NumberFormat(resolveLocale(locale, 'en-US'), {
    useGrouping: false,
    maximumFractionDigits: 0,
  });
  return (
    format.format(value < 0 ? -numerator : numerator) +
    '/' +
    format.format(denominator)
  );
}
export function basisPoints(
  value: number | null | undefined,
  maximumFractionDigits = 2,
  locale = 'en-US'
): string {
  if (
    !finite(value) ||
    !integer(maximumFractionDigits, 0, 20) ||
    !finite(value * 10000)
  )
    return '';
  return (
    new Intl.NumberFormat(resolveLocale(locale, 'en-US'), {
      maximumFractionDigits,
    }).format(value * 10000) + ' bp'
  );
}
export function numberBase(
  value: number | bigint | null | undefined,
  radix = 16
): string {
  if (
    !integer(radix, 2, 36) ||
    !(typeof value === 'bigint' || integer(value, -Number.MAX_SAFE_INTEGER))
  )
    return '';
  return value.toString(radix);
}
