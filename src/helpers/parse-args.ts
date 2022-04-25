const ARGUMENTS_SEPARATION_REGEX = /((?:"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|\/[^/\\]*(?:\\[\S\s][^/\\]*)*\/[gimy]*(?=\s|$)|(?:\\\s|\S))+)(?=\s|$)/g;
const ARGUMENT_SEPARATION_REGEX = /([^=\s]+)=?\s*(.*)/;

export default (args: string) => {
  const parsed = {};

  args.match(ARGUMENTS_SEPARATION_REGEX).forEach((arg) => {
    const parsedArgs = arg.match(ARGUMENT_SEPARATION_REGEX);
    parsedArgs.splice(0, 1);

    const [key, value] : string[] = parsedArgs;

    let parsedKey: string;
    if (key.indexOf('-') === 0) {
      parsedKey = key.slice(key.slice(0, 2).lastIndexOf('-') + 1);
    } else {
      parsedKey = key;
    }

    let parsedValue: string | number | boolean;
    if (value === '' || value === undefined) {
      parsedValue = true;
    } else if (parseFloat(value).toString() === value) {
      parsedValue = parseFloat(value);
    } else {
      parsedValue = value.replace(/^["'](.+(?=["']$))["']$/, '$1');
    }

    parsed[parsedKey] = parsedValue;
  });

  return parsed;
};
