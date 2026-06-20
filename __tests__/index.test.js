import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const expected = fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8').trimEnd();

test('compare nested JSON files', () => {
  expect(genDiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  )).toBe(expected);
});

test('compare nested YAML files', () => {
  expect(genDiff(
    getFixturePath('file1.yml'),
    getFixturePath('file2.yml'),
  )).toBe(expected);
});

test('compare JSON and YAML files', () => {
  expect(genDiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.yml'),
  )).toBe(expected);
});
