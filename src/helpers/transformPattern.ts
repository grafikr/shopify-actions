export default (input: string): string => {
  let pattern = input.trim();

  pattern = pattern.replace(/\*/g, '(.*?)');

  if (pattern.startsWith('/') && pattern.endsWith('/')) {
    pattern = pattern.slice(1, -1);
  } else {
    pattern = pattern.split('/').join('\\/');
  }

  return pattern;
};
