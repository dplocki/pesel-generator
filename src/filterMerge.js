import momentRandom from 'moment-random';
import { oldYearFilter } from './oldYearFilter';
import { dateFilter } from './dateFilter';

export function filterMerge(input) {
  const result = { date: null, gender: 'any' };
  const inputRegex = /^(m|f|a)?([><=])?(\d+)$/i;
  const match = inputRegex.exec(input);

  if (match) {
    if (input.length >= 4) {
      result.date = dateFilter(match[3]);
    } else {
      result.date = oldYearFilter(match[2] + match[3]);
    }
  } else {
    result.date = momentRandom();
  }

  return result;
}
