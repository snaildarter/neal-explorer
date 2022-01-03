import { formatTimeStamp, formatNum, getValue } from '../../utils/format';

test('format TimeStamp', () => {
  expect(formatTimeStamp()).toBe('');
  expect(formatTimeStamp(1608620982)).toBe('22/12/2020 15:09');
});

test('format Num', () => {
  expect(formatNum()).toBe('');
  expect(formatNum(123)).toBe('123');
  expect(formatNum(123456789)).toBe('123, 456, 789');
});

test('get values', () => {
  expect(getValue()).toBe(0);
  expect(getValue([{ value: 12 }, { value: 12 }])).toBe(24);
});
