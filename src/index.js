import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import buildDiff from './buildDiff.js';
import formatDiff from './formatters/stylish.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseData(readFile(filepath1), getFormat(filepath1));
  const data2 = parseData(readFile(filepath2), getFormat(filepath2));

  const diff = buildDiff(data1, data2);

  switch (format) {
    case 'stylish':
      return formatDiff(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default genDiff;
