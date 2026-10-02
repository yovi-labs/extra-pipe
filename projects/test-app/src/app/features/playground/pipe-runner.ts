import type { PlaygroundSample } from '../../data/pipe-example.model';
import { EXAMPLES_BY_SELECTOR, PIPE_EXAMPLES } from '../../data/pipe-examples';
import { PIPE_ADAPTERS } from './pipe-adapters';
export const SAMPLES: Readonly<Record<string, PlaygroundSample>> = Object.fromEntries(
  PIPE_EXAMPLES.map((example) => [example.selector, example.sample]),
);
export function runPipe(
  selector: string,
  value: unknown,
  parameters: readonly unknown[],
  locale: string,
): unknown {
  const adapter = PIPE_ADAPTERS.get(selector);
  if (!adapter) throw new Error('No playground adapter for this selector.');
  const example = EXAMPLES_BY_SELECTOR.get(selector);
  if (!example || parameters.length > example.parameterNames.length)
    throw new Error('Too many parameters for this pipe. Locale is controlled separately.');
  return adapter(value, parameters, locale);
}
export interface PlaygroundResult {
  readonly output: string;
  readonly error: string;
  readonly value: unknown;
}
export function evaluateInput(
  selector: string,
  input: string,
  parameters: string,
  locale: string,
): PlaygroundResult {
  try {
    if (input.length > 20000 || parameters.length > 5000)
      throw new Error('Keep playground inputs below 20,000 characters and parameters below 5,000.');
    const value: unknown = JSON.parse(input),
      params: unknown = JSON.parse(parameters);
    if (!Array.isArray(params)) throw new Error('Parameters must be a JSON array.');
    if (params.length > 8) throw new Error('Use at most 8 parameters.');
    assertBoundedData([value, params]);
    if (params.some((parameter) => typeof parameter === 'string' && parameter.length > 128))
      throw new Error('Keep string parameters below 128 characters.');
    if (Array.isArray(value) && value.length > 500)
      throw new Error(
        'The playground accepts up to 500 items. Precompute larger collections outside templates.',
      );
    const output = runPipe(selector, value, params, locale);
    const rendered =
      typeof output === 'string'
        ? output
        : typeof output === 'number'
          ? String(output)
          : (JSON.stringify(
              output instanceof Map ? Array.from(output.entries()) : output,
              null,
              2,
            ) ?? '');
    if (rendered.length > 20000)
      throw new Error('Output is too large for this playground. Reduce the input.');
    return { output: rendered, error: '', value };
  } catch (error) {
    return {
      output: '',
      error:
        error instanceof SyntaxError
          ? 'Enter valid JSON for the input and parameters.'
          : error instanceof Error
            ? error.message
            : 'This input is not supported.',
      value: undefined,
    };
  }
}

/** Bound nested JSON too: root-array limits alone do not protect object inputs. */
function assertBoundedData(value: unknown): void {
  let nodes = 0;
  function visit(current: unknown, depth: number): void {
    if (++nodes > 5000 || depth > 12)
      throw new Error('Keep data below 5,000 values and 12 nesting levels.');
    if (Array.isArray(current)) {
      if (current.length > 500)
        throw new Error('The playground accepts up to 500 items per collection.');
      current.forEach((item) => visit(item, depth + 1));
    } else if (current && typeof current === 'object') {
      Object.values(current).forEach((item) => visit(item, depth + 1));
    }
  }
  visit(value, 0);
}
