import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('compare flat JSON files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test('compare flat YAML files', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test('compare JSON and YAML files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});
