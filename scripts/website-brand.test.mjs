import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const source = new URL('../projects/test-app/', import.meta.url);
const theme = readFileSync(new URL('src/styles.css', source), 'utf8');
const layout = readFileSync(new URL('src/styles-layout.css', source), 'utf8');
const logo = readFileSync(
  new URL('public/extra-pipe-mark.svg', source),
  'utf8'
);
function token(name) {
  const match = theme.match(new RegExp(`--${name}:\\s*(#[\\da-f]{6})`, 'i'));
  assert.ok(match, `Missing theme token: ${name}`);
  return match[1];
}
function rgb(hex) {
  return hex
    .slice(1)
    .match(/../g)
    .map(value => parseInt(value, 16));
}
function luminance(color) {
  const linear = color.map(value => {
    const channel = value / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function contrast(first, second) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test('theme text and control boundaries meet their contrast thresholds', () => {
  for (const surface of ['surface', 'canvas', 'accent-soft']) {
    for (const text of ['ink', 'muted', 'accent']) {
      assert.ok(
        contrast(rgb(token(text)), rgb(token(surface))) >= 4.5,
        `${text} on ${surface}`
      );
    }
    assert.ok(
      contrast(rgb(token('control-border')), rgb(token(surface))) >= 3,
      `control on ${surface}`
    );
    assert.ok(
      contrast(rgb(token('accent')), rgb(token(surface))) >= 3,
      `focus on ${surface}`
    );
  }
  assert.ok(
    contrast(rgb(token('code-ink')), rgb(token('code-surface'))) >= 4.5
  );
});

test('both gradient segments retain readable white buttons and colored headline text', () => {
  const stops = ['brand-pink', 'brand-magenta', 'brand-violet'].map(name =>
    rgb(token(name))
  );
  for (let segment = 0; segment < stops.length - 1; segment++) {
    for (let step = 0; step <= 100; step++) {
      const ratio = step / 100;
      const color = stops[segment].map(
        (value, index) => value + (stops[segment + 1][index] - value) * ratio
      );
      assert.ok(
        contrast(color, rgb('#ffffff')) >= 4.5,
        'White button text on gradient'
      );
      for (const background of [token('canvas'), '#eee3fb']) {
        assert.ok(
          contrast(color, rgb(background)) >= 4.5,
          'Gradient headline on background'
        );
      }
    }
  }
  assert.match(theme, /@media \(forced-colors: active\)/);
  assert.match(theme, /color: CanvasText/);
  assert.match(layout, /min-height: 44px/);
});

test('the shared original vector mark stays small and contains no active or external content', () => {
  assert.ok(Buffer.byteLength(logo) < 2000);
  assert.match(logo, /viewBox="0 0 64 64"/);
  assert.match(logo, /<title>Extra Pipe/);
  assert.doesNotMatch(
    logo,
    /<(?:script|image|foreignObject)\b|\bon\w+=|\bhref=/i
  );
  for (const name of ['brand-pink', 'brand-magenta', 'brand-violet']) {
    assert.ok(
      logo.toLowerCase().includes(token(name)),
      `${name} is shared by logo and theme`
    );
  }
  const index = readFileSync(new URL('src/index.html', source), 'utf8');
  const shell = readFileSync(new URL('src/app/app.html', source), 'utf8');
  assert.match(index, /rel="icon"[^>]*href="extra-pipe-mark\.svg"/);
  assert.match(
    shell,
    /src="extra-pipe-mark\.svg" alt="" width="40" height="40"/
  );
});
