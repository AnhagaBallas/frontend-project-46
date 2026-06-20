import _ from 'lodash';

const isObject = (value) => _.isObject(value) && !Array.isArray(value);

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (isObject(data1[key]) && isObject(data2[key])) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }
    if (data1[key] === data2[key]) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    return {
      key,
      type: 'changed',
      oldValue: data1[key],
      newValue: data2[key],
    };
  });
};

export default buildDiff;
