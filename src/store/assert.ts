export function assert(value: unknown, error?: string): asserts value {
  if (!value) {
    throw new Error(`Assertion failed${error ? `: ${error}` : ''}`);
  }
}
