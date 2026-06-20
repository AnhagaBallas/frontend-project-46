import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

const getFormatter = (format) => {
  const formatter = formatters[format];
  if (!formatter) {
    throw new Error(`Unknown format: '${format}'. Available formats: ${Object.keys(formatters).join(', ')}`);
  }
  return formatter;
};

export default getFormatter;
