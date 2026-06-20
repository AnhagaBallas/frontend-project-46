import fs from 'fs';
import path from 'path';

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

  console.log('File 1:', data1);
  console.log('File 2:', data2);
};

export default genDiff;