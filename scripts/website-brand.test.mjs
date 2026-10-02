import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const source = new URL('../projects/test-app/', import.meta.url);
const theme = readFileSync(new URL('src/styles.css', source), 'utf8');
const layout = readFileSync(new URL('src/styles-layout.css', source), 'utf8');
const home = readFileSync(new URL('src/app/features/home.css', source), 'utf8');
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

test('both brand gradient segments retain readable white button text', () => {
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
    }
  }
  assert.match(theme, /@media \(forced-colors: active\)/);
  assert.match(theme, /color: CanvasText/);
  assert.match(layout, /min-height: 44px/);
});

test('the lighter heading gradient remains readable on all dark surfaces', () => {
  const stops = ['heading-pink', 'heading-magenta', 'heading-violet'].map(
    name => rgb(token(name))
  );
  for (let segment = 0; segment < stops.length - 1; segment++) {
    for (let step = 0; step <= 100; step++) {
      const ratio = step / 100;
      const color = stops[segment].map(
        (value, index) => value + (stops[segment + 1][index] - value) * ratio
      );
      for (const background of ['canvas', 'surface', 'accent-soft']) {
        assert.ok(
          contrast(color, rgb(token(background))) >= 4.5,
          `Heading gradient on ${background}`
        );
      }
    }
  }
  assert.match(theme, /color-scheme: dark/);
  assert.match(theme, /background: var\(--heading-gradient\)/);
  assert.doesNotMatch(layout, /background: #fff\b/);
});

test('the shared original vector mark stays small and contains no active or external content', () => {
  assert.ok(Buffer.byteLength(logo) < 2000);
  assert.match(logo, /viewBox="0 0 64 64"/);
  assert.match(logo, /<title>Extra Pipe/);
  assert.match(logo, /connected pipeline monogram/);
  assert.equal([...logo.matchAll(/<path\b/g)].length, 2);
  assert.equal([...logo.matchAll(/stroke-width="6"/g)].length, 2);
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

test('homepage motion is opt-in, finite and does not hide or reflow content', () => {
  assert.match(home, /@media \(prefers-reduced-motion: no-preference\)/);
  assert.match(home, /animation: home-rise 380ms[^;]* backwards/);
  assert.match(
    home,
    /@keyframes home-rise\s*\{\s*from\s*\{\s*transform: translateY\(12px\);\s*\}\s*to\s*\{\s*transform: translateY\(0\);\s*\}\s*\}/
  );
  assert.match(home, /transition: transform 160ms ease-out/);
  assert.doesNotMatch(
    home,
    /\b(?:infinite|will-change|opacity|visibility)\s*[:;]/
  );
  assert.doesNotMatch(home, /transition: all/);
  assert.match(
    theme,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*transition: none !important;[\s\S]*animation: none !important;/
  );
});

test('wide-screen layout scales the homepage without fixing or clipping content', () => {
  assert.match(theme, /@media \(min-width: 1600px\)/);
  assert.match(theme, /min-height: 100svh/);
  assert.match(theme, /main\.container:has\(app-home\)/);
  assert.match(home, /font-size: clamp\(76px, 4\.2vw, 112px\)/);
  assert.match(home, /max-width: 1200px/);
  assert.doesNotMatch(home, /height: 100(?:svh|vh);|overflow: hidden/);
});

test('button variants retain keyboard focus, readable colors and bounded transitions', () => {
  assert.match(
    layout,
    /\.button\.secondary\s*\{[\s\S]*?color: var\(--ink\);[\s\S]*?border-color: var\(--control-border\);/
  );
  assert.match(layout, /\.button\.ghost\s*\{[\s\S]*?color: var\(--ink\);/);
  assert.match(layout, /\.button\.secondary:is\(:hover, :focus-visible\)/);
  assert.match(layout, /button:enabled:is\(:hover, :focus-visible\)/);
  assert.match(
    theme,
    /:focus-visible\s*\{\s*outline: 3px solid var\(--accent\);/
  );
  assert.match(layout, /@media \(forced-colors: active\)/);
  assert.doesNotMatch(layout, /transition: all|outline: (?:none|0)/);
});
