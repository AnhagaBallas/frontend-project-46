import _ from 'lodash';

const INDENT_SIZE = 4;
const SHIFT = 2; // смещение влево для спецсимвола

const isObject = (value) => _.isObject(value) && !Array.isArray(value);

// Форматирует обычное значение (не узел дерева диффа)
const formatValue = (value, depth) => {
  if (!isObject(value)) {
    return String(value);
  }

  const indent = ' '.repeat(depth * INDENT_SIZE);
  const closingIndent = ' '.repeat((depth - 1) * INDENT_SIZE);

  const lines = Object.entries(value).map(
    ([k, v]) => `${indent}${k}: ${formatValue(v, depth + 1)}`,
  );

  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

const formatDiff = (diff, depth = 1) => {
  const indent = ' '.repeat(depth * INDENT_SIZE - SHIFT);
  const closingIndent = ' '.repeat((depth - 1) * INDENT_SIZE);

  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${formatValue(node.oldValue, depth + 1)}`,
          `${indent}+ ${node.key}: ${formatValue(node.newValue, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${indent}  ${node.key}: ${formatDiff(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

export default formatDiff;
