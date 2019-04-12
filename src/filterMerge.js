import momentRandom from 'moment-random';
import { oldYearFilter } from './oldYearFilter';
import { dateFilter } from './dateFilter';

export function filterMerge(input) {
  const result = { date: null, gender: 'a' };
  const inputRegex = /^(m|f|a)?(([><=])?(\d+))$/i;
  const match = inputRegex.exec(input);

  if (match) {
    if (match[2].length >= 4) {
      result.date = dateFilter(match[2]);
    } else {
      result.date = oldYearFilter(match[2]);
    }

    result.gender = match[1] ? match[1] : 'a';
  } else {
    result.date = momentRandom();
  }

  return result;
}
