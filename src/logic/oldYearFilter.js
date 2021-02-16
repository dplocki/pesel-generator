import momentRandom from 'moment-random';
import { SignEnum } from './signEnum';

export function oldYearFilter(sign, dateOrAge, actualDate = null) {
  if (isNaN(dateOrAge)) {
    return null;
  }

  const years = -1 * parseInt(dateOrAge, 10);
  const birthDate = actualDate.clone().add(years, 'years');

  switch(sign)
  {
    case SignEnum.Equal:
      return birthDate;

    case SignEnum.Greater:
      return momentRandom(birthDate);

    case SignEnum.Lesser:
      return momentRandom(actualDate, birthDate);

    default:
      throw new Error('Uknown error');
  }
}
