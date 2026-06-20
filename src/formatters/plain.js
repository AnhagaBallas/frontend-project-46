const isObject = (value) => typeof value === 'object' && value !== null;

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const fullPath = path ? `${path}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'unchanged':
        return [];
      case 'nested':
        return formatPlain(node.children, fullPath);
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default formatPlain;
