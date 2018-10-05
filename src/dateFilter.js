import moment from 'moment';

export function dateFilter(input) {
  const onlyDigits = input.replace(/[^0-9]/g, '');

  return moment(onlyDigits);
}
