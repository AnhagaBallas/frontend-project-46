import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const parseData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2) => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const data1 = parseData(readFile(filepath1), format1);
  const data2 = parseData(readFile(filepath2), format2);

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const lines = keys.flatMap((key) => {
    if (!Object.hasOwn(data2, key)) {
      return [`  - ${key}: ${data1[key]}`];
    }
    if (!Object.hasOwn(data1, key)) {
      return [`  + ${key}: ${data2[key]}`];
    }
    if (data1[key] === data2[key]) {
      return [`    ${key}: ${data1[key]}`];
    }
    return [
      `  - ${key}: ${data1[key]}`,
      `  + ${key}: ${data2[key]}`,
    ];
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;