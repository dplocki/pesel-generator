import moment from 'moment';
import momentRandom from 'moment-random';
import { SignEnum } from './signEnum';

export const minimalPESELDate = moment.utc('18000101');
export const maxiumPESELDate = moment.utc('23001231');

export function generateDate(sign, startDate, endDate) {
  switch (sign) {
    case SignEnum.Equal:
      return momentRandom(endDate, startDate);

    case SignEnum.Greater:
      return momentRandom(maxiumPESELDate, endDate);

    case SignEnum.Lesser:
      return momentRandom(startDate, minimalPESELDate);
  }

  throw new Error(`Uknown sign: ${sign}`);
}
