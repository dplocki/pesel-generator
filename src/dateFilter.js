import moment from 'moment';
import momentRandom from 'moment-random';

export function dateFilter(input) {
  const onlyDigits = input.replace(/[^0-9]/g, '');

  if (onlyDigits.length === 6) {
    const newInput = onlyDigits + '01';
    const start = moment(newInput);
    const end = start.add(1, 'months').add(-1, 'days');

    return momentRandom(start, end);
  }

  return moment(onlyDigits);
}
