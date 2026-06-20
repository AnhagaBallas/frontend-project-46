import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trimEnd();

const expectedStylish = readFixture('expected_stylish.txt');
const expectedPlain = readFixture('expected_plain.txt');

describe('stylish format', () => {
  test('compare nested JSON files', () => {
    expect(genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
    )).toBe(expectedStylish);
  });

  test('compare nested YAML files', () => {
    expect(genDiff(
      getFixturePath('file1.yml'),
      getFixturePath('file2.yml'),
    )).toBe(expectedStylish);
  });

  test('compare JSON and YAML files', () => {
    expect(genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.yml'),
    )).toBe(expectedStylish);
  });
});

describe('plain format', () => {
  test('compare nested JSON files', () => {
    expect(genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'plain',
    )).toBe(expectedPlain);
  });

  test('compare nested YAML files', () => {
    expect(genDiff(
      getFixturePath('file1.yml'),
      getFixturePath('file2.yml'),
      'plain',
    )).toBe(expectedPlain);
  });
});
