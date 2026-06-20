import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trimEnd();

const expectedStylish = readFixture('expected_stylish.txt');
const expectedPlain = readFixture('expected_plain.txt');
const expectedJson = readFixture('expected_json.json');

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

describe('json format', () => {
  test('compare nested JSON files', () => {
    const result = genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'json',
    );
    // проверяем что вывод валидный JSON
    expect(() => JSON.parse(result)).not.toThrow();
    // проверяем совпадение с фикстурой
    expect(result).toBe(expectedJson);
  });

  test('compare nested YAML files', () => {
    const result = genDiff(
      getFixturePath('file1.yml'),
      getFixturePath('file2.yml'),
      'json',
    );
    expect(() => JSON.parse(result)).not.toThrow();
    expect(result).toBe(expectedJson);
  });

  test('json output has correct structure', () => {
    const result = genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'json',
    );
    const parsed = JSON.parse(result);

    // проверяем что результат — массив узлов
    expect(Array.isArray(parsed)).toBe(true);

    // каждый узел имеет обязательные поля
    parsed.forEach((node) => {
      expect(node).toHaveProperty('key');
      expect(node).toHaveProperty('type');
      expect(['added', 'removed', 'changed', 'unchanged', 'nested']).toContain(node.type);
    });
  });
});
