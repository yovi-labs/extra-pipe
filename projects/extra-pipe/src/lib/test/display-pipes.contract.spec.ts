import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  CompactNumberPipe,
  FormatDurationPipe,
  RelativeTimePipe,
} from '../../public-api';

describe('display pipe contracts', () => {
  let compactNumber: CompactNumberPipe;
  let formatDuration: FormatDurationPipe;
  let relativeTime: RelativeTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompactNumberPipe,
        FormatDurationPipe,
        RelativeTimePipe,
        { provide: LOCALE_ID, useValue: 'en-US' },
      ],
    });

    compactNumber = TestBed.inject(CompactNumberPipe);
    formatDuration = TestBed.inject(FormatDurationPipe);
    relativeTime = TestBed.inject(RelativeTimePipe);
  });

  it('formats compact numbers with its injected locale and accepts locale overrides', () => {
    expect(compactNumber.transform(12_500)).toBe(
      new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1,
      }).format(12_500)
    );
    expect(compactNumber.transform(12_500, 'compact', 1, 'fr-FR')).toBe(
      new Intl.NumberFormat('fr-FR', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1,
      }).format(12_500)
    );
    expect(compactNumber.transform(12_500, 'standard', 0, 'ar-MA')).toBe(
      new Intl.NumberFormat('ar-MA', {
        notation: 'standard',
        maximumFractionDigits: 0,
      }).format(12_500)
    );
  });

  it('returns an empty string for invalid compact numbers', () => {
    expect(compactNumber.transform(null)).toBe('');
    expect(compactNumber.transform(Number.NaN)).toBe('');
    expect(compactNumber.transform(Number.POSITIVE_INFINITY)).toBe('');
    expect(compactNumber.transform(10, 'unsupported' as never)).toBe('');
  });

  it('formats durations with localized unit parts', () => {
    const minute = new Intl.NumberFormat('en-US', {
      style: 'unit',
      unit: 'minute',
      unitDisplay: 'short',
    }).format(1);
    const second = new Intl.NumberFormat('en-US', {
      style: 'unit',
      unit: 'second',
      unitDisplay: 'short',
    }).format(30);

    expect(formatDuration.transform(90, 'seconds')).toBe(`${minute} ${second}`);
    expect(formatDuration.transform(90, 'seconds', 'short', 'fr-FR')).toContain(
      new Intl.NumberFormat('fr-FR', {
        style: 'unit',
        unit: 'minute',
        unitDisplay: 'short',
      }).format(1)
    );
  });

  it('returns an empty string for invalid or negative durations', () => {
    expect(formatDuration.transform(null)).toBe('');
    expect(formatDuration.transform(-1)).toBe('');
    expect(formatDuration.transform(Number.NaN)).toBe('');
    expect(formatDuration.transform(1, 'days' as never)).toBe('');
  });

  it('uses caller-controlled reference time for relative values', () => {
    const reference = new Date('2024-01-01T12:00:00.000Z');
    const value = new Date('2024-01-01T12:03:00.000Z');

    expect(relativeTime.transform(value, reference)).toBe(
      new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' }).format(
        3,
        'minute'
      )
    );
    expect(relativeTime.transform(value, reference, 'ar-MA')).toBe(
      new Intl.RelativeTimeFormat('ar-MA', { numeric: 'auto' }).format(
        3,
        'minute'
      )
    );
  });

  it('returns an empty string for invalid relative-time inputs', () => {
    expect(relativeTime.transform('not a date')).toBe('');
    expect(relativeTime.transform(new Date(), 'not a date')).toBe('');
  });
});
