import * as dayjs from 'dayjs';

export function formatTimeStamp(time) {
  if (!time) {
    return '';
  }
  const date = dayjs.unix(time);
  return date.format('DD/MM/YYYY HH:mm');
}

export function formatNum(num = '') {
  if (num.length <= 3) {
    return num;
  }
  const strNum = num.toString();
  const strNumL = strNum.length;
  return strNum
    .split('')
    .reverse()
    .map((item, i) => ((i + 1) % 3 === 0 && i + 1 !== strNumL ? `, ${item}` : item))
    .reverse()
    .join('');
}

export function getValue(outs = []) {
  let val = 0;
  if (outs.length) {
    outs.forEach((item) => {
      val += item.value;
    });
  }
  return val;
}

export default formatTimeStamp;
