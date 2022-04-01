export default (input: string): string => {
  let pattern = input.trim();

  if (pattern.startsWith('/') && pattern.endsWith('/')) {
    return pattern.slice(0, -1);
  }

  if (pattern.endsWith('/')) {
    pattern += '*';
  }

  if (pattern.startsWith('*')) {
    pattern = `*${pattern}`;
  }

  return pattern;
};
