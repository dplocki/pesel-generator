import { oldYearFilter } from './oldYearFilter';
import { dateFilter } from './dateFilter';

export function generateDate(dateOrAgeSign, dateOrAge, actualDate) {
  if (dateOrAge.length >= 4) {
    return dateFilter(dateOrAgeSign, dateOrAge, actualDate);
  }

  return oldYearFilter(dateOrAgeSign, dateOrAge, actualDate);
}
