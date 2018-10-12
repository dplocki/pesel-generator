import moment from 'moment';

export function oldYearFilter(input, actualDate = null) {
  const today = actualDate || moment;
  const years = -1 * parseInt(input, 10);

  return today.add(years, 'years');
}
