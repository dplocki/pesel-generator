import moment from 'moment';
import momentRandom from 'moment-random';

export function dateFilter(input) {
  const onlyDigits = input.replace(/[^0-9]/g, '');

  if (onlyDigits.length === 4) {
    // Missing day and month
    const newInput = onlyDigits + '0101';
    const start = moment(newInput);
    const end = start.clone().add(1, 'years').add(-1, 'days');

    return momentRandom(end, start);
  } else if (onlyDigits.length === 6) {
    // Missing day number
    const newInput = onlyDigits + '01';
    const start = moment(newInput);
    const end = start.clone().add(1, 'months').add(-1, 'days');

    return momentRandom(end, start);
  } else if (onlyDigits.length === 8) {
    return moment(onlyDigits);
  }

  return null;
}
