import momentRandom from 'moment-random';
import { SignEnum } from './signEnum';

export function generateDate(sign, startDate, endDate, actualDate) {
  switch (sign) {
    case SignEnum.Equal:
      return momentRandom(endDate, startDate);

    case SignEnum.Greater:
      return momentRandom(actualDate, endDate);

    case SignEnum.Lesser:
      return momentRandom(endDate);
  }

  throw new Error(`Uknown sign: ${sign}`);
}
